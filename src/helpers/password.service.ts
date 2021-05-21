import { Service } from 'typedi'
import { hash, compare, genSaltSync, genSalt } from 'bcrypt'

export type Salt = string | number

@Service()
export class PasswordService {
  /**
   * the salt to be used to hash the password. if specified as a number then a
   * salt will be generated with the specified number of rounds and used
   */
  salt: Salt
  saltRounds: number = 10

  constructor() {
    this.salt = genSaltSync(this.saltRounds)
  }

  /**
   *
   * @param password the password to be encrypted.
   * @param encrypted the encrypted password to be compared against.
   * @returns whether the password match the encrypted password
   */
  async compare(password: string, encrypted: string): Promise<boolean> {
    return compare(password, encrypted)
  }

  /**
   * @param password the password to be encrypted
   * @return encrypted password
   */
  async hash(password: string): Promise<string> {
    this.salt = await genSalt(this.saltRounds)
    return hash(password, this.salt)
  }
}
