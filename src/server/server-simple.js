const Koa = require('koa')
const app = new Koa()
const indexRoutes = require('../routes/index')

// Log requests
/*app.use(async (ctx) => {
  const start = new Date()
  const ms = new Date() - start
  console.log('POLARIS X SERVICE: %s %s - %s', ctx.method, ctx.url, ms)
})*/

app.use(indexRoutes.routes())

module.exports = app.listen(3000)

