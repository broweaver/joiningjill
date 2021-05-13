import dotenv from 'dotenv'

dotenv.config()

// Map configuration variables or set default if not available
const REDIS_PORT: number = process.env.REDIS_PORT
  ? Number(process.env.REDIS_PORT)
  : 6379
const REDIS_HOST: string = process.env.REDIS_HOST ?? '127.0.0.1'
const REDIS_PASSWORD: string = process.env.REDIS_PASSWORD ?? ''
const REDIS_EXPIRES: number = process.env.REDIS_EXPIRES
  ? Number(process.env.REDIS_EXPIRES)
  : 86400

const PORT: number = process.env.PORT ? Number(process.env.PORT) : 3000

const ETSY_KEY: string = process.env.ETSY_KEY ?? ''
const ETSY_URL: string = process.env.ETSY_URL ?? 'https://openapi.etsy.com/v2/'
const ETSY_SHOP: string = process.env.ETSY_SHOP ?? 'joiningjill'

export default {
  REDIS_PORT,
  REDIS_HOST,
  REDIS_PASSWORD,
  REDIS_EXPIRES,
  PORT,
  ETSY_URL,
  ETSY_KEY,
  ETSY_SHOP
}
