import config from './config'
import Koa from 'koa'
import context from './context'
import mongooseMain from './mongoose'
import path from 'path'
import Router from 'koa-router'
import mountRoutes from '../routes'

const app = new Koa()

// routes
mountRoutes(app)

// cors

// body parser

app.listen(config.port, () => {
  console.warn(`application is startup, listening on port ${config.port}`)
})