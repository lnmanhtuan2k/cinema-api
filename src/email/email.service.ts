import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendVerificationEmail(to: string, token: string) {
    const url = `${process.env.APP_URL}/auth/verify-email?token=${token}`;
    await this.transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject: 'Verify your email',
      html: `Click <a href="${url}">here</a> to verify. Link expires in 30 minutes.`,
    });
  }
}