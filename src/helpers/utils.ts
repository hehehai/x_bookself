import { randomBytes } from 'crypto'

// 打印信息
export const print = {
  log: (text: string) => console.log('\x1b[37m%s \x1b[2m%s\x1b[0m', '>', text),
  danger: (text: string) => console.log('\x1b[31m%s \x1b[31m%s\x1b[0m', '>', text),
  tip: (text: string) => console.log('\x1b[36m%s \x1b[36m%s\x1b[0m', '>', text),
}

// 输入数据类型转换
export async function transformStringFieldUpdateInput<
  T extends undefined | string | { set?: string }
>(input: T, transform: (input: string) => Promise<string>): Promise<T> {
  if (typeof input === 'object' && typeof input?.set === 'string') {
    return { set: await transform(input.set) } as T
  }
  if (typeof input === 'object') {
    if (typeof input.set === 'string') {
      return { set: await transform(input.set) } as T
    }
    return input
  }
  if (typeof input === 'string') {
    return (await transform(input)) as T
  }
  return input
}

// 随机生成字符串
export function genRandomStr(len = 10) {
  return randomBytes(len / 2).toString('hex')
}
