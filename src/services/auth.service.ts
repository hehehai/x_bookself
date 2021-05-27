import Environment from '@app/configs/environments'
import { PasswordService } from '@app/helpers/password.service'
import { User } from '@prisma/client'
import { verify } from 'jsonwebtoken'
import { NotFoundError, UnauthorizedError } from 'routing-controllers'
import { Service } from 'typedi'
import { UserService } from './user.service'

@Service()
export class AuthService {
  constructor(
    private userService: UserService,
    private passwordService: PasswordService,
  ) {}

  // 登录
  async validateUser(name: string, password: string): Promise<User> {
    const user = await this.userService.findOne({
      where: { name: name },
      select: { id: true, name: true, password: true },
    })
    if (!user) {
      throw new NotFoundError('User not found')
    }

    if (!this.passwordService.compare(password, user.password)) {
      throw new UnauthorizedError('User password not match')
    }

    return user
  }
}
