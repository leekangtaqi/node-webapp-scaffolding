import { Controller, Param, Get } from '../../../framework/app/Decorators'
import { Context } from 'koa'

@Controller('/user')
export default class UserController {
  @Get('/')
  async getUser( { ctx }: { ctx: any } ){
    let x = null
    x = await ctx.app.ctx.services.UserService.find()
    return x
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string, { ctx }: { ctx: any } ){
    let x = null
    x = await ctx.app.ctx.services.UserService.find()
    return x[0]
  }
}