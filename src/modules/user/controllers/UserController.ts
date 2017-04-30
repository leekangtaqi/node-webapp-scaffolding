import { Controller, Param, Get, UseBefore } from '../../../framework/app'
import {  } from '../../common/middlewares/testMiddleware'
import { Context } from 'koa'

@Controller('/api/user')
@UseBefore([async function(ctx:any, next:Function) {
  await next()
}])
export default class UserController {
  @Get('/')
  @UseBefore([async function(ctx:any, next:Function) {
    console.warn('fdiosajfdosiajfoids')
    await next()
  }])
  async getUser( { ctx }: { ctx: any } ){
    try {
      let x = null
      x = await ctx.app.ctx.services.UserService.find()
      return x
    } catch (e) {
      console.error(e)
    }
    
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string, { ctx }: { ctx: any } ){
    let x = null
    x = await ctx.app.ctx.services.UserService.find()
    return x[0]
  }
}