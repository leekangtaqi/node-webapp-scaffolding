import context from '../app/context'

export default function UserApiRouter(router){
  let { userController }  = context.controllers

  router.get('/', userController.getUser)
  
  return router
}