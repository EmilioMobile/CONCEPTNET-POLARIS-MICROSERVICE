'use strict'

const Router = require('koa-router')
const router = new Router()

var ConceptNet = require('../conceptnet.js')
var cNet = new ConceptNet()

router.post('/api/concepnet/lookup', async (ctx) => {
  const term = ctx.request.body.queryResult.parameters.any
  if (term !== undefined) {
    try {
      const output = await request(ctx, term)
      ctx.res.setHeader('Content-Type', 'application/json')
      let response = JSON.stringify(output)
      let responseObject = {
        'fulfillmentText': response,
        'fulfillmentMessages': [{'text': {'text': [response]}}],
        'source': ''
      }
      ctx.body = responseObject
    } catch (e) {
      ctx.body = 'Concepnet Search: Error to be handled'
      console.log(e.stack)
    }
  } else {
    ctx.body = 'Concepnet Search: Term is undefined'
    console.log('term is undefined')
  }
})

function request (ctx, term) {
  return new Promise(function (resolve, reject) {
    cNet.lookup('/c/en/' + term, {
      limit: 100,
      offset: 0
    }, function onDone (err, result) {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

module.exports = router
