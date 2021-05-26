import Environment from '@app/configs/environments'
import { MailRecordService } from '@app/services/mailRecord.service'
import { add, compareAsc } from 'date-fns'
import { createTransport, Transporter } from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import { BadRequestError, NotFoundError } from 'routing-controllers'
import { Service } from 'typedi'
import { MailSendOptions, MailType, MailVerifyData } from './interface'

@Service()
export class MailerService {
  public mailer: Transporter<SMTPTransport.SentMessageInfo>

  constructor(private mailRecordService: MailRecordService) {
    this.mailer = createTransport({
      service: 'QQ',
      auth: {
        user: Environment.MAILER_USER,
        pass: Environment.MAILER_PASS,
      },
    })
  }

  public async sendVerify(mail: MailSendOptions): Promise<void> {
    await this.mailer.sendMail(mail.options)
    await this.mailRecordService.create({
      data: {
        from: mail.options.from?.toString() || '',
        to: mail.options.to?.toString() || '',
        subject: mail.options.subject?.toString() || '',
        receiver: { connect: { id: mail.userId } },
        type: MailType.verify,
        code: mail.code,
        expirationAt: add(new Date(), {
          minutes: 10,
        }),
      },
    })
  }

  public async receiveVerify(params: MailVerifyData): Promise<boolean> {
    const record = await this.mailRecordService.findFirst({
      where: { to: params.email, receiverId: params.userId, type: MailType.verify },
      select: {
        id: true,
        code: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    if (!record) {
      throw new NotFoundError('Email not found')
    }

    if (record.expirationAt && compareAsc(record.expirationAt, new Date()) === -1) {
      throw new BadRequestError('Code expiration')
    }

    return params.code === record.code
  }
}
