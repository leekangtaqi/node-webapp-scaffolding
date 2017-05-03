export default function UserApiRouter(router){
  router.get('/:id', async (ctx, next) => {
    console.warn(ctx.params.id)
    ctx.body = 'ok';
  })
  return router
}