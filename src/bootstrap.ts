import { join } from 'path'
import { print } from './helpers/utils'
import dotenv from 'dotenv'
import { Env } from './helpers/interface'

// "before" will trigger before the app lift.
export const before = (): Env => {
  // solve ncc path link.
  const result = dotenv.config({ path: join(__dirname, '../.env') })
  if (result.error) {
    print.danger('Environment variable not loaded: not found ".env".')
    return {}
  }
  return result.parsed || {}
}

// "after" will trigger after the "container" lift.
export const after = (): any => {
  // after server bootstrap
}
