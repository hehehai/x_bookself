import { Prisma, PrismaClient } from '@prisma/client'

async function seeds() {
  console.info('Seeding database...')
  const db = new PrismaClient()

  await insertUsers(db)

  await db.$disconnect()
  console.info('Seeded database successfully')
}

async function insertUsers(db: PrismaClient) {
  const users: Array<Prisma.UserCreateInput> = [
    {
      name: '李小田',
      password: 'ff89102',
      books: {
        create: [
          {
            name: '大地之上',
            author: '罗欣顿·米斯特里',
            status: 2,
          },
          {
            name: '乌合之众',
            author: '古斯塔夫.勒庞',
            status: 2,
          },
        ],
      },
    },
    {
      name: '望月',
      password: 'ff89102',
      books: {
        create: [
          {
            name: '夜晚的潜水艇',
            author: '陈春成',
            status: 2,
          },
        ],
      },
    },
    {
      name: '子行',
      password: 'ff89102',
      books: {
        create: [
          {
            name: '回归故里',
            author: '迪迪埃·埃里蓬',
            status: 3,
          },
          {
            name: '烧纸',
            author: '李沧东',
            status: 1,
          },
        ],
      },
    },
    {
      name: '宁瑾',
      password: 'ff89102',
      books: {
        create: [
          {
            name: '走出唯一真理观',
            author: '陈嘉映',
            status: 1,
          },
          {
            name: '碎片',
            author: '埃莱娜·费兰特',
            status: 2,
          },
        ],
      },
    },
    {
      name: '泽高',
      password: 'ff89102',
      books: {
        create: [
          {
            name: '失落的卫星',
            author: '刘子超',
            status: 2,
          },
          {
            name: '银河系边缘的小失常',
            author: '埃特加·凯雷特',
            status: 3,
          },
        ],
      },
    },
    {
      name: '清风徐来',
      password: 'ff89102',
      books: {
        create: [
          {
            name: '文化失忆',
            author: '克莱夫·詹姆斯',
            status: 1,
          },
        ],
      },
    },
    {
      name: '翁小飞',
      password: 'ff89102',
    },
  ]

  const insertFns = users.map(async user => {
    await db.user.create({ data: user })
  })

  await Promise.all(insertFns)
}

try {
  seeds()
} catch (err) {
  console.error('Seeded Error', err)
  process.exit(1)
}
