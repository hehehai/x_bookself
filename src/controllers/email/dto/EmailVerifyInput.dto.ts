import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class EmailVerifyInput {
  @IsNotEmpty()
  @IsEmail()
  email!: string

  @IsNotEmpty()
  @IsString()
  name!: string
}
