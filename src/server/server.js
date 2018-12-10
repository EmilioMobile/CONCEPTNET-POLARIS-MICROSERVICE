const Koa = require('koa')
var bodyParser = require('koa-bodyparser')

const app = new Koa()
const indexRoutes = require('../routes/index')
const concepnetRoutes = require('../routes/conceptnet.route')

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.status || 500
    ctx.body = err.message
    ctx.app.emit('error', err, ctx)
  }
})

app.on('error', (err, ctx) => {
  /* centralized error handling:
   *   console.log error
   *   write error to log file
   *   save error and request information to database if ctx.request match condition
   *   ...
  */
  err = ''
  // console.log(err)
})

app.use(bodyParser())
app.use(indexRoutes.routes())
app.use(concepnetRoutes.routes())

var port = 4040
module.exports = app.listen(process.env.PORT || port)

