import { Service } from 'typedi'
import PrismaService from '@db/client'
import { Prisma, User } from '@prisma/client'
import { PasswordService } from '@app/helpers/password.service'
import { transformStringFieldUpdateInput } from '@app/helpers/utils'
import { JwtPayInfo } from '@app/helpers/interface'
import Environment from '@app/configs/environments'
import { JsonWebTokenError, TokenExpiredError, verify } from 'jsonwebtoken'
import { UnauthorizedError } from 'routing-controllers'

@Service()
export class UserService {
  constructor(
    protected readonly prisma: PrismaService,
    protected readonly passwordService: PasswordService,
  ) {}

  async count<T extends Prisma.UserFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserFindManyArgs>,
  ): Promise<number> {
    return this.prisma.user.count(args)
  }

  async findMany<T extends Prisma.UserFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserFindManyArgs>,
  ): Promise<User[]> {
    return this.prisma.user.findMany(args)
  }

  async findOne<T extends Prisma.UserFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserFindUniqueArgs>,
  ): Promise<User | null> {
    return this.prisma.user.findUnique(args)
  }

  async findFirst<T extends Prisma.UserFindFirstArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserFindFirstArgs>,
  ): Promise<User | null> {
    return this.prisma.user.findFirst(args)
  }

  async create<T extends Prisma.UserCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserCreateArgs>,
  ): Promise<User> {
    return this.prisma.user.create<T>({
      ...args,

      data: {
        ...args.data,
        password: await this.passwordService.hash(args.data.password),
      },
    })
  }

  async update<T extends Prisma.UserUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserUpdateArgs>,
  ): Promise<User> {
    return this.prisma.user.update<T>({
      ...args,

      data: {
        ...args.data,

        password:
          args.data.password &&
          (await transformStringFieldUpdateInput(args.data.password, password =>
            this.passwordService.hash(password),
          )),
      },
    })
  }

  async delete<T extends Prisma.UserDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserDeleteArgs>,
  ): Promise<User> {
    return this.prisma.user.delete(args)
  }

  async findOneByToken(token: string): Promise<User | null> {
    try {
      const tokenPayInfo = verify(
        token.replace('Bearer ', ''),
        Environment.JWT_PRIVATE_KEY,
      ) as JwtPayInfo

      return this.findOne({ where: { id: tokenPayInfo.id } })
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        throw new UnauthorizedError('token expired')
      } else if (err instanceof JsonWebTokenError) {
        throw new UnauthorizedError('token error')
      }
      return null
    }
  }
}
