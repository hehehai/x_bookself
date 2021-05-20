import { Server } from 'http'
import { print } from './helpers/utils'
import Environment from './configs/environments'
import app from './application'
import * as bootstrap from './bootstrap'

module.exports = (async (): Promise<Server | undefined> => {
  try {
    return app.listen(Environment.port, () => {
      print.log(
        `server listening on ${Environment.port}, in ${Environment.identity} mode.`,
      )
      bootstrap.after()
    })
  } catch (e) {
    console.log(e)
  }
})()
