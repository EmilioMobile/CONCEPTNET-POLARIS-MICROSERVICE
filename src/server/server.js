'use strict'
const express = require('express')
const proxy = require('http-proxy-middleware')
const spdy = require('spdy')

// stand alone
const morgan = require('morgan')
const helmet = require('helmet')
//const movieAPI = require('../api/movies')

const start = (container) => {
  return new Promise((resolve, reject) => {
    const {port, ssl} = container.resolve('serverSettings')
    const routes = container.resolve('routes')

    if (!routes) {
      reject(new Error('The server must be started with routes discovered'))
    }
    if (!port) {
      reject(new Error('The server must be started with an available port'))
    }

    const app = express()

    for (let id of Reflect.ownKeys(routes)) {
      const {route, target} = routes[id]
      app.use(route, proxy({
        target,
        changeOrigin: true,
        logLevel: 'debug'
      }))
    }

    if (process.env.NODE === 'test') {
      const server = app.listen(port, () => resolve(server))
    } else {
      const server = spdy.createServer(ssl, app)
        .listen(port, () => resolve(server))
    }
  })
}

const start_x = (options) => {
  return new Promise((resolve, reject) => {
    // we need to verify if we have a repository added and a server port
    if (!options.repo) {
      reject(new Error('The server must be started with a connected repository'))
    }
    if (!options.port) {
      reject(new Error('The server must be started with an available port'))
    }
    // let's init a express app, and add some middlewares
    const app = express()
    app.use(morgan('dev'))
    app.use(helmet())
    app.use((err, req, res, next) => {
      reject(new Error('Something went wrong!, err:' + err))
      res.status(500).send('Something went wrong!')
    })

    // we add our API's to the express app
    //movieAPI(app, options)

    // finally we start the server, and return the newly created server
    const server = app.listen(options.port, () => resolve(server))
  })

}

module.exports = Object.assign({}, {start})
