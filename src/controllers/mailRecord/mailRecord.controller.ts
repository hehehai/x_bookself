import { MailRecordService } from '@app/services/mailRecord.service'
import { MailRecord } from '@prisma/client'
import { Get, JsonController, QueryParams } from 'routing-controllers'
import { Service } from 'typedi'
import { MailRecordFindManyArgs } from './dto/MailRecordFindManyArgs.dto'

@JsonController('/mail-records')
@Service()
export class MailRecordController {
  constructor(private mailRecordService: MailRecordService) {}

  @Get('/')
  async findMany(@QueryParams() params: MailRecordFindManyArgs): Promise<MailRecord[]> {
    return this.mailRecordService.findMany({
      where: {
        to: { contains: params.to },
        subject: { contains: params.subject },
        code: params.code,
        type: params.type,
      },
      orderBy: params.orderBy ? { [params.orderBy]: params.orderType } : undefined,
      take: params.take,
      skip: params.skip,
      select: {
        id: true,
        from: true,
        to: true,
        type: true,
        subject: true,
        code: true,
        expirationAt: true,
        createdAt: true,
        updateAt: true,
        deletedAt: true,
        receiver: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })
  }
}
