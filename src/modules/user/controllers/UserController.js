export default class UserController {
  async getUser(ctx) {
    const { params, app } = ctx
    try {
      const { errors } = app.ctx
      const users = await app.ctx.services.UserService().find()
      ctx.body = users
    } catch (e) {
      throw e
    }
  }

  async getUserById(id) {
    try {
      console.warn('get user by id')
    } catch (e) {
      throw e
    }
  }
}