import { registerAs } from '@nestjs/config';
import { IsOptional, IsString } from 'class-validator';
import validateConfig from 'src/utils/validate-config';
import { BullsConnectConfig } from './bullsconnect.config.type';

class EnvironmentVariablesValidator {
  @IsString()
  @IsOptional()
  BC_SESSION_ID?: string;
}

export default registerAs<BullsConnectConfig>('bullsconnect', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    sessionId: process.env.BC_SESSION_ID,
  };
});
