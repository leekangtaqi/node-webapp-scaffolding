import { Controller, Param, Get, UseBefore } from '../../../framework/app'
import {  } from '../../common/middlewares/testMiddleware'
import { Context } from 'koa'

export default class UserController {
  async getUser(ctx){
    try {
      console.warn('get user')
      return x
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