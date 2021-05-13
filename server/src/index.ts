import app from './app' // the actual Express application
import http, { Server } from 'http'
import config from './utils/config'
import logger from './utils/logger'

const server: Server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
