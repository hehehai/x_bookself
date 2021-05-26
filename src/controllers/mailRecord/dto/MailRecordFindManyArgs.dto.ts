import { FindManyBase, SortOrder } from '@app/helpers/dto'
import { MailType } from '@app/helpers/interface'
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator'

export class MailRecordFindManyArgs extends FindManyBase {
  @IsOptional()
  @IsString()
  to?: string

  @IsOptional()
  @IsString()
  subject?: string

  @IsOptional()
  @IsString()
  code?: string

  @IsOptional()
  @IsEnum(MailType)
  type?: MailType

  @IsOptional()
  @IsInt()
  receiverId?: number

  @IsOptional()
  orderBy?: string

  @IsOptional()
  @IsEnum(SortOrder)
  orderType?: SortOrder
}
