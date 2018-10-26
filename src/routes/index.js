const Router = require('koa-router')
const router = new Router()
const db = require('../repository/db.json')

router.get('/api/users', async (ctx) => {
  ctx.body = db.users
})

router.get('/api/users/:userId', async (ctx) => {
  const id = parseInt(this.params.userId)
  ctx.body = db.users.find((user) => user.id === id)
})

router.get('/api/threads', async (ctx) => {
  ctx.body = db.threads
})

router.get('/api/threads/:threadId', async (ctx) => {
  const id = parseInt(this.params.threadId)
  ctx.body = db.threads.find((thread) => thread.id === id)
})

router.get('/api/posts/in-thread/:threadId', async (ctx) => {
  const id = parseInt(this.params.threadId)
  ctx.body = db.posts.filter((post) => post.thread === id)
})

router.get('/api/posts/by-user/:userId', async (ctx) => {
  const id = parseInt(this.params.userId)
  ctx.body = db.posts.filter((post) => post.user === id)
})

router.get('/api/', async (ctx) => {
  ctx.body = 'API ready to receive requests'
})

router.get('/', async (ctx) => {
  ctx.body = 'Ready to receive requests'
})

module.exports = router
