import { registerAs } from '@nestjs/config';
import { IsOptional, IsString } from 'class-validator';
import validateConfig from 'src/utils/validate-config';
import { ChatConfig } from './chat.config.type';

class EnvironmentVariablesValidator {
  @IsString()
  OPENAI_API_KEY?: string;

  @IsOptional()
  @IsString()
  OPENAI_BASE_URL?: string;

  @IsString()
  OPENAI_CHAT_MODEL?: string;
}

export default registerAs<ChatConfig>('chat', (): ChatConfig => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    apiKey: process.env.OPENAI_API_KEY!,
    baseUrl: process.env.OPENAI_BASE_URL,
    model: process.env.OPENAI_CHAT_MODEL!,
  };
});
