const Koa = require('koa')
var bodyParser = require('koa-bodyparser')

const app = new Koa()
const indexRoutes = require('../routes/index')
const concepnetRoutes = require('../routes/conceptnet')

app.use(bodyParser())
app.use(indexRoutes.routes())
app.use(concepnetRoutes.routes())

module.exports = app.listen(3000)

