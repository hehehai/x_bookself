import { PrismaClient } from '@prisma/client'
import { Service } from 'typedi'

@Service()
export default class PrismaService extends PrismaClient {
  constructor() {
    super()
  }
}
