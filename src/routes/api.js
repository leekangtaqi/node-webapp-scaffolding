import userApi from './user-api'
import ProductApi from './product-api'
import mount, { Router } from '../framework/route-mounter'

export default function Api(router) {
  
  router.use(async (ctx, next) => {
    console.warn('in api ...............')
    await next()
  })

  mount('/user', userApi)(router)
  
  mount('/product', ProductApi)(router)

  return router 
}