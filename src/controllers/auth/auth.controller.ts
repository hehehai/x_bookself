// login
// registry
// forget password

import Environment from '@app/configs/environments'
import { MailerService } from '@app/helpers/mailer.service'
import { PasswordService } from '@app/helpers/password.service'
import { UserService } from '@app/services/user.service'
import { User } from '@prisma/client'
import { sign } from 'jsonwebtoken'
import {
  BadRequestError,
  Body,
  JsonController,
  NotFoundError,
  Post,
} from 'routing-controllers'
import { Service } from 'typedi'
import { ForgetPasswordInput } from './dto/forgetPassword.dto'
import { LoginInput } from './dto/login.dto'
import { RegisterInput } from './dto/register.dto'

@JsonController('/auth')
@Service()
export class AuthController {
  constructor(
    private userService: UserService,
    private passwordService: PasswordService,
    private mailerService: MailerService,
  ) {}

  // 注册
  @Post('/register')
  async register(@Body() data: RegisterInput): Promise<User> {
    return this.userService.create({
      data: {
        ...data,
        status: 1,
      },
      select: {
        id: true,
      },
    })
  }

  // 登录
  @Post('/login')
  async login(@Body() data: LoginInput): Promise<string> {
    const user = await this.userService.findOne({
      where: { name: data.name },
      select: { id: true, name: true, password: true },
    })
    if (!user) {
      throw new NotFoundError('User not found')
    }

    if (!this.passwordService.compare(data.password, user.password)) {
      throw new BadRequestError('User password not match')
    }

    return sign({ id: user.id, name: user.name }, Environment.JWT_PRIVATE_KEY, {
      expiresIn: '1h',
    })
  }

  // 忘记密码
  @Post('/forget-password')
  async forgetPassword(@Body() data: ForgetPasswordInput): Promise<void> {
    const user = await this.userService.findOne({
      where: { name: data.name },
      select: {
        id: true,
        name: true,
        email: true,
      },
    })
    if (!user) {
      throw new NotFoundError('User not found')
    }
    if (user.email !== data.email) {
      throw new NotFoundError('Email not found')
    }

    const pass = await this.mailerService.receiveVerify({
      email: data.email,
      userId: user.id,
      code: data.code,
    })

    if (!pass) {
      throw new BadRequestError('code not match')
    }

    await this.userService.update({
      where: { id: user.id },
      data: { password: data.password },
    })
  }
}
