import { NextFunction, Request, Response } from 'express'
import redis from 'redis'
import config from './../utils/config'
import logger from './../utils/logger'

const redisClient = redis.createClient({
  host: config.REDIS_HOST,
  port: config.REDIS_PORT,
  password: config.REDIS_PASSWORD
})

redisClient.on('connect', () =>
  console.log(`Connected to Redis on port ${config.REDIS_PORT}`)
)

const set = (key: string, value: any) => {
  redisClient.setex(key, 3600, JSON.stringify(value))
  logger.info(`${key} set in cache`)
}

const get = (request: Request, response, next: NextFunction) => {
  const key = request.originalUrl
  redisClient.get(key, (error, cachedData) => {
    if (error) {
      logger.error(error)
      response.status(400).send(error)
    }
    if (cachedData !== null) {
      logger.info(`${key} found in cache`)
      response.status(200).send(JSON.parse(cachedData))
    } else {
      next()
    }
  })
}

export default {
  set,
  get
}
