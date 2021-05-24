import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class ForgetPasswordInput {
  @IsNotEmpty()
  @IsEmail()
  email!: string

  @IsNotEmpty()
  @IsString()
  name!: string

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(6)
  code!: string

  @IsNotEmpty()
  @IsString()
  password!: string
}
