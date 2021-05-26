import { MailType } from '@app/helpers/interface'
import { MailerService } from '@app/helpers/mailer.service'
import { genRandomStr } from '@app/helpers/utils'
import { UserService } from '@app/services/user.service'
import { Body, JsonController, NotFoundError, Post } from 'routing-controllers'
import { Service } from 'typedi'
import { EmailVerifyInput } from './dto/EmailVerifyInput.dto'

@JsonController('/mail')
@Service()
export class MailController {
  constructor(private userService: UserService, private mailerService: MailerService) {}

  @Post('/verify')
  async sendVerify(@Body() body: EmailVerifyInput): Promise<void> {
    const user = await this.userService.findOne({
      where: { name: body.name },
      select: {
        id: true,
        name: true,
        email: true,
      },
    })
    if (!user) {
      throw new NotFoundError(`User not found`)
    }
    if (!user.email) {
      throw new NotFoundError(`Email not found`)
    }

    const code = genRandomStr(6)
    await this.mailerService.sendVerify({
      options: {
        from: '"X_BOOK 👻" <2220660866@qq.com>', // sender address
        to: body.email, // list of receivers
        subject: 'Forget Password Code ✔', // Subject line
        text: code, // plain text body
        html: `<b>${code}</b>`, // html body
      },
      userId: user.id,
      code: code,
      type: MailType.verify,
    })
  }
}
