const listingsRouter = require('express').Router()
import { Response, Request } from 'express'
import axios from 'axios'
import config from './../utils/config'
import redis from './../cache/redis'
import logger from '../utils/logger'

// Get all listings for the joiningjill shop
listingsRouter.get('/', async (request: Request, response: Response) => {
  const imageIncludes: Array<string> = [
    'url_75x75',
    'url_170x135',
    'url_570xN',
    'url_fullxfull'
  ]
  const fields: Array<string> = [
    'listing_id',
    'state',
    'title',
    'description',
    'price',
    'currency_code',
    'quantity',
    'tags',
    'materials',
    'url',
    'item_weight',
    'item_weight_unit',
    'item_length',
    'item_width',
    'item_height',
    'item_dimensions_unit'
  ]

  const resp = await axios.get(
    `${config.ETSY_URL}/shops/${config.ETSY_SHOP}/listings/active`,
    {
      params: {
        api_key: config.ETSY_KEY,
        includes: `Images(${imageIncludes.join(',')})`,
        fields: fields.join(','),
        limit: 100 //TODO - figure out a better way to grab all results and display them - default limit here is 25
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
