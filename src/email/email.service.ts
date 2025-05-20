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
    const url = `${process.env.APP_URL}/api/auth/verify-email?token=${token}`;
    await this.transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject: ' Xác thực email của bạn',
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f7; padding: 20px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
            <!-- Header -->
            <tr>
              <td style="background-color: #4a90e2; padding: 20px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px;">YUU CINEMA</h1>
              </td>
            </tr>
            <!-- Body -->
            <tr>
              <td style="padding: 30px; color: #51545e;">
                <p>Xin chào,</p>
                <p>Cảm ơn bạn đã đăng ký tài khoản tại <strong>YUU CINEMA</strong>. Vui lòng nhấp vào nút bên dưới để xác thực email của bạn. Liên kết này sẽ hết hạn sau 30 phút.</p>
                <div style="text-align: center; margin: 30px 0;">
                  <a
                    href="${url}"
                    style="
                      background-color: #22bc66;
                      color: #ffffff;
                      text-decoration: none;
                      padding: 12px 24px;
                      border-radius: 6px;
                      font-weight: bold;
                      display: inline-block;
                    "
                  >Xác Thực Email</a>
                </div>
                <p>Nếu nút trên không hoạt động, bạn có thể sao chép và dán đường link sau vào trình duyệt:</p>
                <p style="word-break: break-all;"><a href="${url}" style="color: #3869d4;">${url}</a></p>
                <p>Trân trọng,<br/>Đội ngũ YUU CINEMA</p>
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td style="background-color: #f4f4f7; padding: 20px; text-align: center; font-size: 12px; color: #a8aaaf;">
                <p>Bạn nhận được email này vì có yêu cầu đăng ký tài khoản tại YUU CINEMA. Nếu bạn không yêu cầu, xin vui lòng bỏ qua email này.</p>
              </td>
            </tr>
          </table>
        </div>
      `,
    });
  }
}