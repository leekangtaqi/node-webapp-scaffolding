import app from './app'
import logging, { logger } from './logging'
import config from 'ddd-settings'

app.ready(() => {
  app.listen(config.port, config.bindIp, () => {
    logger.info(`application is startup, listening on port ${config.port}`)
  })
})