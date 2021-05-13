import config from './utils/config'
import express from 'express'
const app = express()
import cors from 'cors'
import middleware from './utils/middleware'
import cache from './cache/redis'

// Controllers (route handlers)
import listingsController from './controllers/listings'

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

// Cache all requests by route/return in redis
app.use(cache.get)

// API route configuration
app.use('/listings', listingsController)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app
