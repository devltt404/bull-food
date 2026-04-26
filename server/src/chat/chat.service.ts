import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { GetEventsDto } from 'src/events/dto/get-events.dto';
import { EventsService } from 'src/events/events.service';
import { ChatDto } from './dto/chat.dto';

const TOOLS: OpenAI.Chat.Completions.ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'get_events',
      description:
        'Fetch upcoming food events at USF. Call this whenever the user asks about food events, availability, timing, location, or anything related to campus food.',
      parameters: {
        type: 'object',
        properties: {
          searchWord: {
            type: 'string',
            description:
              'Keyword to search for a specific food type (e.g. "pizza", "bbq", "sushi"). Do NOT use meal times like "lunch", "dinner", or "breakfast" as keywords — those are not searchable; use date/time filters instead.',
          },
          fromDate: {
            type: 'string',
            description:
              'Start date in DDMMMYYYY format, e.g. "23APR2026". Defaults to today.',
          },
          toDate: {
            type: 'string',
            description: 'End date in DDMMMYYYY format, e.g. "30APR2026".',
          },
          limit: {
            type: 'number',
            description: 'Max events to return (default 20, max 40).',
          },
        },
        required: [],
        additionalProperties: false,
      },
    },
  },
];

@Injectable()
export class ChatService {
  private readonly openai: OpenAI;
  private readonly model: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly eventsService: EventsService,
  ) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('chat.apiKey'),
      baseURL: this.configService.get<string>('chat.baseUrl'),
    });
    this.model = this.configService.get<string>('chat.model') || 'gpt-4o-mini';
  }

  async *streamChat(dto: ChatDto): AsyncGenerator<string> {
    const today = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: `You are BullFood, a friendly assistant for USF (University of South Florida) students helping them find food events on campus. Today is ${today}. Always use the get_events tool to answer questions — never answer from memory. Be concise and friendly. If a question is unrelated to USF free food events, gently redirect.

When calling get_events:
- Use searchWord only for specific food/cuisine types (e.g. "pizza", "bbq", "sushi"). Never use meal times like "lunch", "dinner", or "breakfast" as searchWord — omit it entirely for those queries.
- For "tomorrow", set fromDate and toDate both to tomorrow's date in DDMMMYYYY format.

When the user asks about "lunch", "dinner", or "breakfast" events, treat those as time-of-day filters, not food categories:
- Breakfast: events that start between 6 AM and 11 AM
- Lunch: events that start or overlap between 11 AM and 2 PM
- Dinner: events that start or overlap between 5 PM and 9 PM
Fetch all events for that date, then determine which ones fall within that time window based on their start/end times.

When listing events, format each one like this:

**<N>. <Event Title>** (bold, no "Title:" label; use index N when listing multiple events, omit the number for a single event)
- **Date:** <date>
- **Time:** <time>
- **Location:** <location>
- **Organizer:** <organizer> (if available)
- **Ongoing:** <count> (if available)
- **Description:** A 1-sentence summary (if available)
- **Food:** <specific food items> — include ONLY when food items are explicitly named in the title or description; omit otherwise

If fewer events are available than requested, just list what exists — do not apologize for the count.`,
      },
      ...dto.messages,
    ];

    // Non-streaming first call — lets the model decide whether to call a tool
    const response = await this.openai.chat.completions.create({
      model: this.model,
      messages,
      tools: TOOLS,
      tool_choice: 'required',
      max_tokens: 512,
      stream: false,
    });

    const choice = response.choices[0];

    if (choice.finish_reason === 'tool_calls' && choice.message.tool_calls) {
      const toolMessages = await this.executeToolCalls(
        choice.message.tool_calls,
      );

      const stream = await this.openai.chat.completions.create({
        model: this.model,
        messages: [...messages, choice.message, ...toolMessages],
        max_tokens: 2048,
        stream: true,
      });

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content;
        if (content) yield `data: ${JSON.stringify({ content })}\n\n`;
      }
    } else {
      // No tool needed — emit the response as a single chunk
      const content = choice.message.content;
      if (content) yield `data: ${JSON.stringify({ content })}\n\n`;
    }

    yield 'data: [DONE]\n\n';
  }

  private async executeToolCalls(
    toolCalls: OpenAI.Chat.Completions.ChatCompletionMessageToolCall[],
  ): Promise<OpenAI.Chat.ChatCompletionToolMessageParam[]> {
    const functionCalls = toolCalls.filter(
      (
        tc,
      ): tc is OpenAI.Chat.Completions.ChatCompletionMessageToolCall & {
        type: 'function';
      } => tc.type === 'function',
    );

    return Promise.all(
      functionCalls.map(async (toolCall) => {
        const args = JSON.parse(toolCall.function.arguments) as Partial<
          GetEventsDto & { limit: number }
        >;

        const events = await this.eventsService.getEvents({
          searchWord: args.searchWord,
          fromDate: args.fromDate,
          toDate: args.toDate,
          limit: Math.min(args.limit ?? 5, 10),
          range: 0,
        } as GetEventsDto);

        const details = await Promise.all(
          events.map((e) =>
            this.eventsService.getEvent(e.id).catch(() => null),
          ),
        );

        const content = events.length
          ? events
              .map((e, i) => {
                const detail = details[i];
                const parts = [`• ${e.title}`];
                if (e.date) parts.push(`  Date: ${e.date}`);
                if (e.startTime)
                  parts.push(
                    `  Time: ${e.startTime}${e.endTime ? ` – ${e.endTime}` : ''}`,
                  );
                if (e.location) parts.push(`  Location: ${e.location}`);
                if (detail?.organizer)
                  parts.push(`  Organizer: ${detail.organizer}`);
                if (detail?.details.description) {
                  const raw = detail.details.description.trim();
                  const truncated =
                    raw.length > 200 ? raw.slice(0, 200).trimEnd() + '…' : raw;
                  parts.push(`  Description: ${truncated}`);
                }
                if (e.going) parts.push(`  Ongoing: ${e.going}`);
                return parts.join('\n');
              })
              .join('\n\n')
          : 'No events found matching your criteria.';

        return {
          role: 'tool' as const,
          tool_call_id: toolCall.id,
          content,
        };
      }),
    );
  }
}
