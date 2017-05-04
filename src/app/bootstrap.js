import logging, { logger } from './logging'
import config from '../config'
import onError from 'koa-onerror'
import views from 'koa-views'
import cors from 'koa-cors'
import path from 'path'
import bodyParser from 'koa-body'
import mountRoutes from '../routes'

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
    let res = await ctx.render('404')
    ctx.body = res
  })

  // error handler
  onError(app,
    {
      json: function (err) {
        logger.error(err);
        this.status = err.status;
        this.body = { errmsg: 'Something Error!' };
      }
    })
}