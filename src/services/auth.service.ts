import { Service } from 'typedi'
import { UserService } from './user.service'

@Service()
export class AuthService {
  constructor(private userService: UserService) {}

  // 登录

  // 忘记密码
}
