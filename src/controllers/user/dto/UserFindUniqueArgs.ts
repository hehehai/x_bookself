import { IsInt, IsNotEmpty } from 'class-validator'

export class UserFindUniqueArgs {
  @IsNotEmpty()
  @IsInt()
  id!: number
}
