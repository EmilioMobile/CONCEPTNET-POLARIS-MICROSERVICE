const Koa = require('koa')
const app = new Koa()
const indexRoutes = require('../routes/index')
const concepnetRoutes = require('../routes/conceptnet')

app.use(indexRoutes.routes())
app.use(concepnetRoutes.routes())

module.exports = app.listen(8080)

