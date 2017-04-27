import * as Koa from 'koa'
import config from './config'
import decorate from '../framework/app'
import context from './context'
import mongooseMain from './mongoose'

let app:any = decorate(new Koa())

// app.addMember('mongoose', mongooseMain)

app.appContext = context

app.use(async (ctx: any, next: any) => {
  let users = await ctx.app.ctx.services.UserService.findUsers()
  console.warn(users)
  ctx.body = users
})

async function main(){
  await app.readyAsync()
  app.listen(config.port, () => {
    console.warn(`application is startup, listening on port ${config.port}`)
  })
}

main();



