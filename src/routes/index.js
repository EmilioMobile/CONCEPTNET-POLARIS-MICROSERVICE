const Router = require('koa-router')
const router = new Router()

router.get('/api/', async (ctx) => {
  ctx.body = 'API ready to receive requests'
})

router.get('/', async (ctx) => {
  ctx.body = 'Ready to receive requests'
})

module.exports = router
