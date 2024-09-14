import { registerAs } from '@nestjs/config';
import { IsEnum, IsInt, IsOptional } from 'class-validator';
import validateConfig from 'src/utils/validate-config';
import { ServerConfig } from './server.config.type';

enum Environment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TEST = 'test',
}

class EnvironmentVariablesValidator {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsInt()
  @IsOptional()
  SERVER_PORT: number;
}

export default registerAs<ServerConfig>('server', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    nodeEnv: process.env.NODE_ENV,
    port: process.env.SERVER_PORT,
  };
});
