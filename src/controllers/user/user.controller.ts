import { User } from '@prisma/client'
import { isUndefined } from 'lodash'
import {
  Body,
  Delete,
  Get,
  JsonController,
  NotFoundError,
  Params,
  Patch,
  Post,
  QueryParams,
} from 'routing-controllers'
import { Service } from 'typedi'
import { UserService } from '../../services/user.service'
import { UserCreateInput } from './dto/UserCreateInput'
import { UserFindManyArgs } from './dto/UserFindManyArgs'
import { UserFindUniqueArgs } from './dto/UserFindUniqueArgs'
import { UserUpdateInput } from './dto/UserUpdateInput'

@JsonController('/users')
@Service()
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/')
  async create(@Body() data: UserCreateInput): Promise<User> {
    return this.userService.create({
      data: { ...data, roles: { connect: [{ code: 'user' }] } },
      select: {
        id: true,
      },
    })
  }

  @Get('/')
  async findMany(@QueryParams() params: UserFindManyArgs): Promise<User[]> {
    return this.userService.findMany({
      where: {
        name: { contains: params.name },
        status: params.status,
        deletedAt: isUndefined(params.deleted)
          ? undefined
          : { [params.deleted ? 'not' : 'equals']: null },
      },
      orderBy: params.orderBy ? { [params.orderBy]: params.orderType } : undefined,
      take: params.take,
      skip: params.skip,
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
        createdAt: true,
        updateAt: true,
        deletedAt: true,
        roles: {
          select: {
            id: true,
          },
        },
      },
    })
  }

  @Get('/:id')
  async findOne(@Params() prams: UserFindUniqueArgs): Promise<User> {
    const result = await this.userService.findOne({
      where: prams,
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
        createdAt: true,
        updateAt: true,
        deletedAt: true,
        roles: {
          select: {
            id: true,
          },
        },
      },
    })
    if (!result) {
      throw new NotFoundError('User Not Found')
    }

    return result
  }

  @Patch('/:id')
  async update(
    @Params() params: UserFindUniqueArgs,
    @Body() data: UserUpdateInput,
  ): Promise<User> {
    return this.userService.update({
      where: { ...params },
      data,
      select: {
        id: true,
      },
    })
  }

  @Patch('/delete/:id')
  async softDelete(@Params() params: UserFindUniqueArgs): Promise<User> {
    return this.userService.update({
      where: params,
      data: {
        deletedAt: new Date(),
      },
      select: { id: true },
    })
  }

  @Delete('/:id')
  async delete(@Params() params: UserFindUniqueArgs): Promise<User> {
    return this.userService.delete({ where: params, select: { id: true } })
  }

  // create book
  // find many books
  // find one book
  // update book
  // soft delete book
  // delete book

  // create tag
  // find many tags
  // find one tag
  // update tag
  // soft delete tag
  // delete tag

  // find user roles
  // find user permissions
}
