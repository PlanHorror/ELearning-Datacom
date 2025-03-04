import { Controller, Get } from '@nestjs/common';
import { EmailService } from './email.service';
// import { EmailDto } from './dto/email.dto';

@Controller('email')
export class EmailController {
  constructor(private emailService: EmailService) {}

  // @Get()
  // test() {
  //   const email: EmailDto = {
  //     email: 'nmtxma2004@gmail.com',
  //     subject: 'Test email',
  //     message: 'This is a test email',
  //   };
  //   return this.emailService.sendEmail(email);
  // }
}
