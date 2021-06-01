import { IsString, IsOptional, IsInt, IsNotEmpty, IsEmail, IsIn } from 'class-validator'

export class UserCreateInput {
  @IsNotEmpty()
  @IsString()
  name!: string

  @IsNotEmpty()
  @IsString()
  password!: string

  @IsOptional()
  @IsEmail()
  email?: string

  @IsOptional()
  @IsInt()
  @IsIn([1, 2])
  status?: number

  @IsOptional()
  role?: string[]
}
