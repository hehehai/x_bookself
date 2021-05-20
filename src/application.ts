import 'reflect-metadata'
import { Context } from 'koa'
import { Container } from 'typedi'
import { useContainer, createKoaServer } from 'routing-controllers'

import path from 'path'

useContainer(Container)

const app = createKoaServer({
  cors: {
    origin: (ctx: Context) => ctx.request.header.origin || ctx.request.origin,
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    allowHeaders: ['content-type'],
    credentials: true,
  },

  controllers: [path.resolve(__dirname, '../src/controllers/*.ts')],
  middlewares: [path.resolve(__dirname, '../src/middlewares/*.ts')],
  interceptors: [path.resolve(__dirname, '../src/interceptors/*.ts')],

  // router prefix
  // e.g. api => http://hostname:port/{routePrefix}/{controller.method}
  routePrefix: '/apis',

  // auto validate entity item
  // learn more: https://github.com/typestack/class-validator
  validation: true,
})

export default app
