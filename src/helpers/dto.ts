import { IsOptional } from 'class-validator'

export class FindManyBase {
  @IsOptional()
  skip?: number

  @IsOptional()
  take?: number
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}
