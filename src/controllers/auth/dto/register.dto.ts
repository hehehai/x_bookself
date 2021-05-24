import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class RegisterInput {
  @IsNotEmpty()
  @IsString()
  name!: string

  @IsNotEmpty()
  @IsString()
  password!: string

  @IsOptional()
  @IsEmail()
  email?: string
}
