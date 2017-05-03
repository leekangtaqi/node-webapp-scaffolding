// import { Controller, Param, Get, UseBefore } from '../../../framework/app'
// import {  } from '../../common/middlewares/testMiddleware'
// import { Context } from 'koa'
class UserController {
  async getUser(ctx){
    const { params } = ctx
    try {
      console.warn('id is **********')
      console.warn(params.id)
      ctx.body = 'get user'
    } catch (e) {
      console.error(e)
    }
    
  }

  async getUserById(){
    try {
      console.warn('get user by id')
    } catch (e) {
      console.error(e)
    }
  }
}

export default function () {
  return new UserController()
}