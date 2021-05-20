import { KoaMiddlewareInterface } from 'routing-controllers'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'

export class BaseMiddleware implements KoaMiddlewareInterface {
  // 接口声明可选

  async use(context: any, next: (err?: any) => Promise<any>): Promise<any> {
    await logger()(context, next)
    await bodyParser()(context, next)
    next()
  }
}
