import * as nodemailer from 'nodemailer';

export interface SendMailData extends nodemailer.SendMailOptions {
  templatePath: string;
  context: Record<string, unknown> | Record<string, unknown>[];
}
