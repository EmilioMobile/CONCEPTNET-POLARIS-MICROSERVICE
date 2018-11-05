'use strict'

const Router = require('koa-router')
const router = new Router()

var ConceptNet = require('../conceptnet.js')
var cNet = new ConceptNet()
router.get('/api/concepnet/search/:term', async (ctx) => {
  try {
    const term = ctx.params.term
    const output = await request(ctx, term)
    // send it back to the NLP AGENT: Dialogflow
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
})

<<<<<<< HEAD
router.post('/api/concepnet/lookup', async (ctx) => {
  const term = ctx.request.body.queryResult.parameters.conceptnet
  if (term !== undefined) {
    try {
      const output = await requestLookup(ctx, term)
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
=======
router.post('/api/concepnet/lookup/:term', async (ctx) => {
  // const term = ctx.params.term
  console.log('')
  ctx.res.setHeader('Content-Type', 'application/json')
  let response = ' '
  let responseObject = {
    'fulfillmentText': response,
    'fulfillmentMessages': [{'text': {'text': ['HOLA']}}],
    'source': ''
  }

  console.log(responseObject)
  ctx.body = responseObject
  // await requestLookup(ctx, term)
>>>>>>> 731c4b784b23a13205cdb9d1a0fafcef72a3963f
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
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

module.exports = router
