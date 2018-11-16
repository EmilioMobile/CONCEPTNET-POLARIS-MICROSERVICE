'use strict'

const Router = require('koa-router')
const router = new Router()

var ConceptNet = require('../controllers/conceptnet.controller.js')
var cNet = new ConceptNet()

router.post('/api/concepnet/query', async (ctx) => {
  if (ctx.request.body === undefined || ctx.request.body.queryResult === undefined || ctx.request.body.queryResult.parameters === undefined ||
    ctx.request.body.queryResult.parameters.any === undefined) {
    console.log('conceptnet lookup api error, malformed json')
    ctx.body = 'conceptnet lookup api error'
    console.log(ctx.request.body)
    return
  }
  const term = ctx.request.body.queryResult.parameters.any
  const relation = ctx.request.body.queryResult.parameters.relation
  try {
    // get conceptnet 5.6 output
    const output = await cNet.query(term, relation)
    // manipulate conceptnet output and
    // send it back to the dialogflow fullfillment client
    let response = JSON.stringify(output)
    let responseObject = {
      'fulfillmentText': response,
      'fulfillmentMessages': [{'text': {'text': [response]}}],
      'source': ''
    }
    ctx.res.setHeader('Content-Type', 'application/json')
    ctx.body = responseObject
  } catch (e) {
    console.log(e.stack)
    ctx.body = 'conceptnet query API error'
  }
})

router.post('/api/concepnet/lookup', async (ctx) => {
  if (ctx.request.body === undefined || ctx.request.body.queryResult === undefined || ctx.request.body.queryResult.parameters === undefined ||
    ctx.request.body.queryResult.parameters.any === undefined) {
    console.log('conceptnet lookup api error, malformed json')
    ctx.body = 'conceptnet lookup api error'
    console.log(ctx.request.body)
    return
  }
  const term = ctx.request.body.queryResult.parameters.any

  try {
    // get conceptnet 5.6 output
    const output = await cNet.lookup(term)
    // manipulate conceptnet output and
    // send it back to the dialogflow fullfillment client
    let response = JSON.stringify(output)
    let responseObject = {
      'fulfillmentText': response,
      'fulfillmentMessages': [{'text': {'text': [response]}}],
      'source': ''
    }
    ctx.res.setHeader('Content-Type', 'application/json')
    ctx.body = responseObject
  } catch (e) {
    console.log(e.stack)
    ctx.body = 'conceptnet lookup API error'
  }
})

module.exports = router
