import logging, { logger } from './logging'
import config from '../config'
import views from 'koa-views'
import cors from 'koa-cors'
import path from 'path'
import bodyParser from 'koa-body'
import mountRoutes from '../routes'
import errors from '../framework/errors'

export default function bootstrap(app) {
  // add some global middlewares here
  app.use(logging.middleware);

  app.use(views(path.join(__dirname, '../views'), { map: { html: 'swig' }}));

  // body parser -> delay
  app.use(bodyParser(config.bodyOptions))

  // cors
  app.use(cors(config.corsOptions))

  // routes
  mountRoutes(app)

  //404
  app.use(async function(ctx, next) {
    ctx.throw(new errors.NotFoundError())
  })

  // error handler
  app.on('error', (err, ctx) => {
    logger.error(err);
    ctx.status = err.statusCode
    ctx.body = { errmsg: err.message }
  });
}