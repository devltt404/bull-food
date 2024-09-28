import { registerAs } from '@nestjs/config';
import { IsString } from 'class-validator';
import validateConfig from 'src/utils/validate-config';
import { DatabaseConfig } from './database.config.type';

class EnvironmentVariablesValidator {
  @IsString()
  DB_URI: string;
}

export default registerAs<DatabaseConfig>('db', (): DatabaseConfig => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    uri: process.env.DB_URI,
  };
});
