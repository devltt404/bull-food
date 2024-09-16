import { registerAs } from '@nestjs/config';
import { IsInt, IsString, Max, Min } from 'class-validator';
import validateConfig from 'src/utils/validate-config';
import { MailConfig } from './mail.config.type';

class EnvironmentVariablesValidator {
  @IsString()
  MAIL_SENDER_NAME: string;

  @IsString()
  MAIL_SENDER_EMAIL: string;

  @IsString()
  MAIL_HOST: string;

  @IsInt()
  @Min(0)
  @Max(65535)
  MAIL_PORT: number;

  @IsString()
  MAIL_USER: string;

  @IsString()
  MAIL_PASS: string;
}

export default registerAs<MailConfig>('mail', (): MailConfig => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    senderName: process.env.MAIL_SENDER_NAME,
    senderEmail: process.env.MAIL_SENDER_EMAIL,
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT),
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  };
});
