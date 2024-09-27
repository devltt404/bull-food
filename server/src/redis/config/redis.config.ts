import { registerAs } from '@nestjs/config';
import { IsString } from 'class-validator';
import validateConfig from 'src/utils/validate-config';
import { RedisConfig } from './redis.config.type';

class EnvironmentValidatorClass {
  @IsString()
  REDIS_URI: string;
}

export default registerAs<RedisConfig>('redis', (): RedisConfig => {
  validateConfig(process.env, EnvironmentValidatorClass);

  return {
    uri: process.env.REDIS_URI,
  };
});
