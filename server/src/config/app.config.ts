import { registerAs } from '@nestjs/config';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import validateConfig from 'src/utils/validate-config';
import { AppConfig } from './app.config.type';

enum Environment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TEST = 'test',
}

class EnvironmentVariablesValidator {
  @IsEnum(Environment)
  @IsOptional()
  NODE_ENV?: Environment;

  @IsOptional()
  @IsString()
  SERVER_HOST?: string;

  @IsInt()
  @Min(0)
  @Max(65535)
  @IsOptional()
  SERVER_PORT?: number;

  @IsOptional()
  @IsString()
  CLIENT_BASE_URL?: string;

  @IsOptional()
  @IsString()
  API_PREFIX?: string;
}

export default registerAs<AppConfig>('app', (): AppConfig => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    nodeEnv: process.env.NODE_ENV || Environment.DEVELOPMENT,
    host: process.env.SERVER_HOST || 'localhost',
    port: parseInt(process.env.SERVER_PORT || '4000'),
    clientBaseUrl: process.env.CLIENT_BASE_URL || 'http://localhost:5173',
    apiPrefix: process.env.API_PREFIX || 'api',
  };
});
