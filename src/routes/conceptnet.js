'use strict'

const Router = require('koa-router')
const router = new Router()

var ConceptNet = require('../conceptnet.js')
var cNet = new ConceptNet()
router.get('/api/concepnet/search/:term', async (ctx) => {
  const term = ctx.params.term
  await request(ctx, term)
})

router.get('/api/concepnet/lookup/:term', async (ctx) => {
  const term = ctx.params.term
  await requestLookup(ctx, term)
})

function request (ctx, term) {
  return new Promise(function (resolve, reject) {
    cNet.search(
     term
    , function onDone (err, result) {
      if (err) {
        console.log(err.stack)
        ctx.body = 'Concepnet Search: Error to be handled'
        reject('bad')
      } else {
        ctx.body = result
        resolve(result)
      }
    })
  })
}

function requestLookup (ctx, term) {
  return new Promise(function (resolve, reject) {
    cNet.lookup('/c/en/' + term, {
      limit: 100,
      offset: 0
    }, function onDone (err, result) {
      if (err) {
        console.log(err.stack)
        ctx.body = 'Concepnet Search: Error to be handled'
        reject('bad')
      } else {
        ctx.body = result
        resolve(result)
      }
    })
  })
}

module.exports = router