import PrismaService from '@app/db/client'
import { MailRecord, Prisma } from '@prisma/client'
import { Service } from 'typedi'

@Service()
export class MailRecordService {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.MailRecordFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.MailRecordFindManyArgs>,
  ): Promise<number> {
    return this.prisma.mailRecord.count(args)
  }

  async findMany<T extends Prisma.MailRecordFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.MailRecordFindManyArgs>,
  ): Promise<MailRecord[]> {
    return this.prisma.mailRecord.findMany(args)
  }

  async findOne<T extends Prisma.MailRecordFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.MailRecordFindUniqueArgs>,
  ): Promise<MailRecord | null> {
    return this.prisma.mailRecord.findUnique(args)
  }

  async findFirst<T extends Prisma.MailRecordFindFirstArgs>(
    args: Prisma.SelectSubset<T, Prisma.MailRecordFindFirstArgs>,
  ): Promise<MailRecord | null> {
    return this.prisma.mailRecord.findFirst(args)
  }

  async create<T extends Prisma.MailRecordCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.MailRecordCreateArgs>,
  ): Promise<MailRecord> {
    return this.prisma.mailRecord.create<T>(args)
  }

  async update<T extends Prisma.MailRecordUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.MailRecordUpdateArgs>,
  ): Promise<MailRecord> {
    return this.prisma.mailRecord.update<T>(args)
  }
}
