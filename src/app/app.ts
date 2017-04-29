import config from './config'
import Application, { IContext } from '../framework/app'
import context from './context'
import mongooseMain from './mongoose'
import { IUserService } from '../modules/interfaces'
import * as path from 'path'

let app = new Application()

app.addMember('mongoose', mongooseMain)

app.domainContext = context

app.use(async (ctx: IContext, next: Function) => {
  console.warn(ctx.app.ctx)
  next()
})

async function main(){
  await app.readyAsync([path.join(__dirname, '../modules')])
  app.listen(config.port, () => {
    console.warn(`application is startup, listening on port ${config.port}`)
  })
}

main();



