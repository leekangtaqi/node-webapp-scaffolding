import config from './config'
import Koa from 'koa'
import mongooseMain from './mongoose'
import path from 'path'
import Router from 'koa-router'
import mountRoutes from '../routes'
import context from './context'
import bootstrap from './bootstrap'

const app = new Koa()

// routes
mountRoutes(app)

app.ctx = context

app.listen(config.port, () => {
  console.warn(`application is startup, listening on port ${config.port}`)
})