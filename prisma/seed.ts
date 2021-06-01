import { Prisma, PrismaClient } from '@prisma/client'
import { genSalt, hash } from 'bcrypt'
import faker from 'faker'

async function seeds() {
  console.info('Seeding database...')
  const db = new PrismaClient()

  // create user
  await insertUsers(db)

  await db.$disconnect()
  console.info('Seeded database successfully')
}

async function insertUsers(db: PrismaClient) {
  const salt = await genSalt(10)
  const passwordStr = 'dd123123'
  const passwordHash = await hash(passwordStr, salt)
  const email = 'bijiasuo1177@163.com'

  // create role
  // create permission
  // create books
  // create book tag
  const users: Array<Prisma.UserCreateInput> = [
    {
      name: faker.name.gender(),
      password: passwordHash,
      email,
      status: 1,
      books: {
        create: genBooks(3),
      },
      roles: {
        create: [
          {
            code: 'user',
            name: '用户',
            permission: {
              create: [
                {
                  code: 'profile:read',
                  name: '个人信息',
                  resource: 'profile',
                  action: 'read:own',
                  attributes: '*',
                },
                {
                  code: 'profile:update',
                  name: '修改个人信息',
                  resource: 'profile',
                  action: 'update:own',
                  attributes: '*',
                },
                {
                  code: 'book:create',
                  name: '创建书籍',
                  resource: 'book',
                  action: 'create:own',
                  attributes: '*',
                },
                {
                  code: 'book:read',
                  name: '查看书籍',
                  resource: 'book',
                  action: 'read:own',
                  attributes: '*',
                },
                {
                  code: 'book:update',
                  name: '编辑书籍',
                  resource: 'book',
                  action: 'update:own',
                  attributes: '*',
                },
                {
                  code: 'book:delete',
                  name: '删除书籍',
                  resource: 'book',
                  action: 'delete:own',
                  attributes: '*',
                },
              ],
            },
          },
        ],
      },
    },
    {
      name: faker.name.gender(),
      password: passwordHash,
      email,
      status: 1,
      books: {
        create: genBooks(3),
      },
      roles: {
        create: [
          {
            code: 'admin',
            name: '管理',
            permission: {
              create: [
                {
                  code: 'super',
                  name: '超级权限',
                  resource: '*',
                  action: '*',
                  attributes: '*',
                },
              ],
            },
          },
        ],
      },
    },
  ]

  const insertFns = users.map(async user => {
    await db.user.create({ data: user })
  })

  await Promise.all(insertFns)
}

async function run() {
  try {
    await seeds()
  } catch (err) {
    console.error('Seeded Error', err)
    process.exit(1)
  }
}

run()

// ---------------------
function genBooks(num = 1): Prisma.BookCreateWithoutOwnerInput[] {
  const books: Prisma.BookCreateWithoutOwnerInput[] = Array(num)
  return books.fill({
    name: faker.lorem.words(),
    author: faker.name.gender(),
  })
}
