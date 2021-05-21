import { FindManyBase, SortOrder } from '@app/helpers/dto'
import { Transform } from 'class-transformer'
import { IsBoolean, IsEnum, IsInt, IsOptional } from 'class-validator'

export class UserFindManyArgs extends FindManyBase {
  @IsOptional()
  name?: string

  @IsOptional()
  @IsInt()
  @Transform(Number)
  status?: number

  @IsOptional()
  @IsBoolean()
  deleted?: boolean

  @IsOptional()
  orderBy?: string

  @IsOptional()
  @IsEnum(SortOrder)
  orderType?: SortOrder
}
