export default function ProductApiRouter(router){

  router.get('/', async (ctx, next) => {
    console.warn(ctx.params.id)
    ctx.body = 'products ... ';
  })

  router.get('/:id', async (ctx, next) => {
    console.warn(ctx.params.id)
    ctx.body = 'ok';
  })
  
  return router
}