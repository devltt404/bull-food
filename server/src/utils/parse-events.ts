import { HTMLElement } from 'node-html-parser';
import { FetchedEvent } from 'src/bullsconnect/infrastructure/api/interfaces/fetched-events.interface';
import { EventsResponseDto } from 'src/events/dto/events-response.dto';
import { getEventImageSrc } from './get-event-image-src';

/**
 * Parse fetched events from BullsConnect API to structured events response DTO
 */
export function parseFetchedEvents(
  fetchedEvents: FetchedEvent[],
): EventsResponseDto[] {
  return fetchedEvents.map((event) => {
    let date: string | null = null;
    let startTime: string | null = null;
    let endTime: string | null = null;
    let startDate: string | null = null;
    let endDate: string | null = null;

    const multipleDateReg =
      /(?<startDate>\w{3}, \w{3} \d{1,2}, \d{4})\s(?<startTime>\d{1,2}(?::\d{2})? [APM]{2})\s&ndash;\s.*?(?<endDate>\w{3}, \w{3} \d{1,2}, \d{4})\s(?<endTime>\d{1,2}(?::\d{2})? [APM]{2})/;
    const oneDateReg =
      /(?<date>\w{3}, \w{3} \d{1,2}, \d{4}).*?(?<startTime>\d{1,2}(?::\d{2})? [APM]{2})\s&ndash;\s(?<endTime>\d{1,2}(?::\d{2})? [APM]{2})/;

    const multipleDateData = event.p4.match(multipleDateReg)?.groups as {
      startDate: string;
      startTime: string;
      endDate: string;
      endTime: string;
    };

    if (multipleDateData) {
      ({ startDate, startTime, endDate, endTime } = multipleDateData);
    } else {
      const singleDateData = event.p4.match(oneDateReg)?.groups as {
        date: string;
        startTime: string;
        endTime: string;
      };
      if (singleDateData) {
        ({ date, startTime, endTime } = singleDateData);
      }
    }

    return {
      id: event.p1,
      title: event.p3,
      date,
      startDate,
      endDate,
      startTime,
      endTime,
      image: getEventImageSrc(event.p11),
      // Get location name text before HTML tags (e.g. 'BSN 221<div>' -> 'BSN 221')
      location: event.p6.match(/^[^<]+/)?.[0].trim() || 'TBD',
      going: parseInt(event.p10),
    };
  });
}

/**
 * Parse event HTML content to structured event data
 */
export function parseEventHTML(root: HTMLElement) {
  const image = root
    .querySelector('.rsvp__event-card img')
    ?.getAttribute('src');

  const title = root.querySelector('.rsvp__event-name')?.text;
  const organizer = root.querySelector('.rsvp__event-org a')?.text;

  const tagsElem = root.querySelector('.rsvp__event-tags');
  const tags = tagsElem
    ? tagsElem
        .querySelectorAll('span.label-tag span')
        .map((tag) => tag.text.trim())
    : [];

  let timeInfo1: string | undefined;
  let timeInfo2: string | undefined;
  let going: number | undefined;
  let calendarUrl:
    | {
        google: string;
        outlook: string;
      }
    | undefined;

  const location: {
    name?: string;
    address?: string;
  } = {
    name: undefined,
    address: undefined,
  };

  const mainCardBlocks = root.querySelectorAll('#event_main_card .card-block');
  const secondMainCardBlock = mainCardBlocks[1];

  if (secondMainCardBlock) {
    const dateParagraphs =
      secondMainCardBlock?.querySelectorAll('.col-md-4_5 p');
    timeInfo1 = dateParagraphs[0] && dateParagraphs[0].text.trim();
    timeInfo2 = dateParagraphs[1] && dateParagraphs[1].text.trim();

    const locationParagraphs =
      secondMainCardBlock?.querySelectorAll('.col-md-5 p');
    location.name = locationParagraphs[0]?.text.trim() || 'TBD';
    location.address = locationParagraphs[1]?.text.trim();

    going = parseInt(
      secondMainCardBlock.querySelector('.col-md-2_5 span')?.text.trim() || '0',
    );

    const eventUid = secondMainCardBlock
      .querySelector('a')
      ?.getAttribute('onclick')
      ?.match(/event_uid=(.*)&/)
      ?.at(1);

    if (eventUid) {
      calendarUrl = {
        google: `https://bullsconnect.usf.edu/divstudsucc/vcal.aspx?type=google&school=usf&uid=${eventUid}`,
        outlook: `https://bullsconnect.usf.edu/divstudsucc/vcal.aspx?type=outlook&school=usf&uid=${eventUid}`,
      };
    }
  }

  const details: {
    image?: string;
    description?: string;
  } = {
    image: undefined,
    description: undefined,
  };
  const detailsBlock = root.querySelector('#event_details .card-block');
  if (detailsBlock) {
    details.image = detailsBlock.querySelector('img')?.getAttribute('src');

    const textNodes = detailsBlock.childNodes.filter(
      (node) => node.nodeType === 3,
    );
    if (textNodes.length > 0) {
      details.description = textNodes
        .map((node) => node.text.trim())
        .join('\n');
    }
  }

  return {
    image,
    title,
    timeInfo1,
    timeInfo2,
    location,
    tags,
    organizer,
    going,
    details,
    calendarUrl,
  };
}
