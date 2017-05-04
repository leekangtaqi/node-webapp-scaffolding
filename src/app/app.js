import config from '../config'
import Koa from 'koa'
import context from './context'
import bootstrap from './bootstrap'
import { logger } from './logging'

const app = new Koa()

app.env = process.env.NODE_ENV || config.env.mode;
app.proxy = true;
app.port =  process.env.PORT || config.env.port;
app.bindip =  process.env.BINDIP || config.env.bindIp;

bootstrap(app)

app.ctx = context

app.listen(config.port, config.bindip, () => {
  logger.info(`application is startup, listening on port ${config.port}`)
})

export default app