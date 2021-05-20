import { JsonController, Get } from 'routing-controllers'
import { Service } from 'typedi'
import { UserService } from '../services/user'

@JsonController()
@Service()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/users')
  async query() {
    return this.userService.query()
  }
}
