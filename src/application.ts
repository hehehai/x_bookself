import 'reflect-metadata'
import path from 'path'
import { Context } from 'koa'
import { Container } from 'typedi'
import { useContainer, createKoaServer, Action } from 'routing-controllers'
import { UserService } from './services/user.service'

useContainer(Container)

const app = createKoaServer({
  cors: {
    origin: (ctx: Context) => ctx.request.header.origin || ctx.request.origin,
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    allowHeaders: ['content-type'],
    credentials: true,
  },

  controllers: [path.resolve(__dirname, '../src/controllers/**/*.controller.ts')],
  middlewares: [path.resolve(__dirname, '../src/middlewares/*.ts')],
  interceptors: [path.resolve(__dirname, '../src/interceptors/**/*.interceptor.ts')],

  // router prefix
  // e.g. api => http://hostname:port/{routePrefix}/{controller.method}
  routePrefix: '/apis',

  // auto validate entity item
  // learn more: https://github.com/typestack/class-validator
  validation: true,

  // authorization user
  // learn more: https://github.com/typestack/routing-controllers#using-authorization-features
  authorizationChecker: async (action: Action, roles: string[]) => {
    // action 是请求上下文
    // roles 是认证路由的 权限元信息标识
    // 验证函数返回 true/false
    const token = action.request.headers['authorization']

    const userService = Container.get(UserService)
    const user = await userService.findOneByToken(token)

    // verify user role and controller role permissions

    return !!user
  },
  currentUserChecker: async (action: Action) => {
    const token = action.request.headers['authorization']
    const userService = Container.get(UserService)
    return userService.findOneByToken(token)
  },
})

export default app
