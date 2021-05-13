import { NextFunction, Request, Response } from 'express'
import asyncRedis from 'async-redis'
import config from './../utils/config'
import logger from './../utils/logger'

const client = asyncRedis.createClient({
  host: config.REDIS_HOST,
  port: config.REDIS_PORT,
  password: config.REDIS_PASSWORD
})

client.on('connect', () =>
  console.log(`Connected to Redis on port ${config.REDIS_PORT}`)
)

client.on('error', err => {
  logger.error(`Failed to connect to Redis: ${err}`)
})

// Cache key with value for an hour
const set = (key: string, value: any) => {
  client.setex(key, config.REDIS_EXPIRES, JSON.stringify(value))
  logger.info(`${key} set in cache`)
}

// Synchronously set
const setSync = async (key: string, value: any) => {
  await client.setex(key, config.REDIS_EXPIRES, JSON.stringify(value))
  logger.info(`${key} set in cache`)
}

// Middleware that checks redis cache for request path and if it exists, return
// Calls synchronously
const get = async (request: Request, response, next: NextFunction) => {
  const key = request.originalUrl
  try {
    const cachedData = await client.get(key)
    if (cachedData !== null) {
      logger.info(`${key} found in cache`)
      response.status(200).send(JSON.parse(cachedData.toString()))
    } else {
      next()
    }
  } catch (e) {
    logger.error(e)
    response.status(400).send(e)
  }
}

// Synchronously flush cache (used for testing)
const flush = async () => {
  await client.flushdb()
  logger.info('cache flushed')
}

const disconnect = () => {
  client.quit()
}

export default {
  set,
  get,
  flush,
  disconnect
}
