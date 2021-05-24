import { IsNotEmpty, IsString } from 'class-validator'

export class LoginInput {
  @IsNotEmpty()
  @IsString()
  name!: string

  @IsNotEmpty()
  @IsString()
  password!: string
}
