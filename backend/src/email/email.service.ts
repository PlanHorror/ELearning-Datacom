import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { EmailDto } from './dto/email.dto';

@Injectable()
export class EmailService {
  constructor(private config: ConfigService) {}
  sendEmail(email: EmailDto) {
    const transporter = nodemailer.createTransport({
      host: this.config.get<string>('EMAIL_HOST'),
      port: this.config.get<number>('EMAIL_PORT'),
      secure: false,
      auth: {
        user: this.config.get<string>('EMAIL_USER'),
        pass: this.config.get<string>('EMAIL_PASSWORD'),
      },
    });
    const mailOptions = {
      from: this.config.get<string>('EMAIL_FROM'),
      to: email.email,
      subject: email.subject,
      text: email.message,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.error('Email sent: ' + info.response);
      }
    });
  }

  sendVerificationEmail(email: string, token: string) {
    const verificationLink = `${this.config.get<string>(
      'EMAIL_VERIFICATION_LINK',
    )}${token}`;
    const mailOptions: EmailDto = {
      email,
      subject: 'Email Verification',
      message: `Click on the link to verify your email: ${verificationLink}`,
    };
    this.sendEmail(mailOptions);
  }
}
