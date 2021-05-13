import dotenv from 'dotenv'

dotenv.config()

const REDIS_PORT: number = Number(process.env.REDIS_PORT)
const REDIS_HOST: string = process.env.REDIS_HOST ?? '127.0.0.1'
const REDIS_PASSWORD: string = process.env.REDIS_PASSWORD ?? ''

const PORT: number = Number(process.env.PORT)

const ETSY_URL: string = process.env.ETSY_URL ?? ''
const ETSY_KEY: string = process.env.ETSY_KEY ?? ''
const ETSY_STORE: string = process.env.ETSY_STORE ?? ''

export default {
  REDIS_PORT,
  REDIS_HOST,
  REDIS_PASSWORD,
  PORT,
  ETSY_URL,
  ETSY_KEY
}
