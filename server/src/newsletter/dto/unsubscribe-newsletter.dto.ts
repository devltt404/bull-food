import { IsEmail } from "class-validator";

export class UnsubscribeNewsletterDto {
  @IsEmail()
  email: string;
}
