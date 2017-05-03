import UserControllerFactory from '../modules/user/controllers/UserController'

export default function UserApiRouter(router){
  router.get('/:id', UserControllerFactory().getUser)
  return router
}