import { Service } from 'typedi'
import PrismaService from '@db/client'
import { Prisma, User } from '@prisma/client'

@Service()
export class UserService {
  constructor(protected readonly prisma: PrismaService) {}

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
  async create<T extends Prisma.UserCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserCreateArgs>,
  ): Promise<User> {
    return this.prisma.user.create<T>({
      ...args,

      data: {
        ...args.data,
        password: args.data.password,
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

        password: args.data.password,
      },
    })
  }
  async delete<T extends Prisma.UserDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserDeleteArgs>,
  ): Promise<User> {
    return this.prisma.user.delete(args)
  }
}
