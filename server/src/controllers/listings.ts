const listingsRouter = require('express').Router()
import { Response, Request } from 'express'
import axios, { AxiosResponse } from 'axios'
import config from './../utils/config'
import logger from '../utils/logger'
import redis from './../cache/redis'

const getListings = async (): Promise<AxiosResponse> => {
  return await axios.get(
    `${config.ETSY_URL}/shops/joiningjill/listings/active`,
    {
      params: { api_key: config.ETSY_KEY }
    }
  )
}

listingsRouter.get('/', async (request: Request, response: Response) => {
  const resp = await axios.get(
    `${config.ETSY_URL}/shops/joiningjill/listings/active`,
    {
      params: {
        api_key: config.ETSY_KEY,
        includes: 'Images(url_570xN,url_fullxfull)'
      }
    }
  )
  if (!resp.data || !resp.data.results) {
    throw new Error('Listing return unknown or malformed')
  }

  redis.set(request.originalUrl, resp.data.results)

  response.json(resp.data.results)
})

listingsRouter.get('/:id', async (request: Request, response: Response) => {
  response.json({})
})

export default listingsRouter
