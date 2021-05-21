import { IsEmail, IsIn, IsInt, IsOptional, IsString } from 'class-validator'

export class UserUpdateInput {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsEmail()
  email?: string

  @IsOptional()
  password?: string

  @IsOptional()
  @IsInt()
  @IsIn([1, 2])
  status?: number
}
