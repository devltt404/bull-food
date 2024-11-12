import { registerAs } from '@nestjs/config';
import { IsString } from 'class-validator';
import validateConfig from 'src/utils/validate-config';
import { RabbitMQConfig } from './rabbitMQ.config.type';

class EnvironmentVariablesValidator {
  @IsString()
  RABBITMQ_URI: string;
}

export default registerAs<RabbitMQConfig>('rabbitmq', (): RabbitMQConfig => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    uri: process.env.RABBITMQ_URI,
  };
});
