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
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
}
