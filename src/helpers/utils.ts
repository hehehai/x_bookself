import { randomBytes } from 'crypto'
import consola from 'consola'

// 打印信息
export const print = {
  log: consola.log,
  danger: consola.error,
  tip: consola.info,
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
