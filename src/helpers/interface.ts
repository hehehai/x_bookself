import Mail from 'nodemailer/lib/mailer'

export interface Env {
  [key: string]: any
}

export enum MailType {
  ad = 0,
  verify = 1,
}

export interface MailSendOptions {
  options: Mail.Options
  userId: number
  code: string
  type?: MailType
}

export interface MailVerifyData {
  userId: number
  email: string
  code: string
}

export interface JwtPayInfo {
  id: number
  name: string
}
