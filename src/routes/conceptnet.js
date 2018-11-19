'use strict'

const Router = require('koa-router')
const router = new Router()

var ConceptNet = require('../controllers/conceptnet.controller.js')
var cNet = new ConceptNet()

router.post('/api/conceptnet/query', async (ctx) => {
  if (ctx.request.body === undefined || ctx.request.body.queryResult === undefined || ctx.request.body.queryResult.parameters === undefined ||
    ctx.request.body.queryResult.parameters.any === undefined || ctx.request.body.queryResult.parameters.relation === undefined) {
    let responseObject = {
      'fulfillmentText': 'CONCEPTNET: QUERY API Wrong or Missing Parameters',
      'fulfillmentMessages': [{'text': {'text': ['CONCEPTNET: QUERY API Wrong or Missing Parameters']}}],
      'source': 'CONCEPTNET'
    }
    ctx.res.setHeader('Content-Type', 'application/json')
    ctx.body = responseObject
  } else {
    /* extract ter and relation parameters */
    const term = ctx.request.body.queryResult.parameters.any
    let relation = ctx.request.body.queryResult.parameters.relation
    try {
      // get conceptnet 5.6 QUERY
      const output = await cNet.query(term, relation)
      // Send it back to the dialogflow fullfillment client
      let response = JSON.stringify(output)
      let responseObject = {
        'fulfillmentText': response,
        'fulfillmentMessages': [{'text': {'text': [response]}}],
        'source': 'CONCEPTNET'
      }
      ctx.res.setHeader('Content-Type', 'application/json')
      ctx.body = responseObject
    } catch (e) {
      let responseObject = {
        'fulfillmentText': 'CONCEPTNET: QUERY API Error',
        'fulfillmentMessages': [{'text': {'text': ['CONCEPTNET: QUERY API Error']}}],
        'source': 'CONCEPTNET'
      }
      ctx.body = responseObject
      console.log(e.stack)
    }
  }
})

router.post('/api/conceptnet/lookup', async (ctx) => {
  if (ctx.request.body === undefined || ctx.request.body.queryResult === undefined || ctx.request.body.queryResult.parameters === undefined ||
    ctx.request.body.queryResult.parameters.any === undefined) {
    let responseObject = {
      'fulfillmentText': 'CONCEPTNET: LOOKUP API Wrong or Missing Parameters',
      'fulfillmentMessages': [{'text': {'text': ['CONCEPTNET: LOOKUP API Wrong or Missing Parameters']}}],
      'source': 'CONCEPTNET'
    }
    ctx.res.setHeader('Content-Type', 'application/json')
    ctx.body = responseObject
  } else {
    const term = ctx.request.body.queryResult.parameters.any
    try {
      // get conceptnet 5.6 output
      const output = await cNet.lookup(term)
      // manipulate conceptnet output, send it back to the dialogflow fullfillment client
      let response = JSON.stringify(output)
      let responseObject = {
        'fulfillmentText': response,
        'fulfillmentMessages': [{'text': {'text': [response]}}],
        'source': 'CONCEPTNET'
      }
      ctx.res.setHeader('Content-Type', 'application/json')
      ctx.body = responseObject
    } catch (e) {
      let responseObject = {
        'fulfillmentText': 'CONCEPTNET: LOOKUP API Error',
        'fulfillmentMessages': [{'text': {'text': ['CONCEPTNET: LOOKUP API Error']}}],
        'source': 'CONCEPTNET'
      }
      ctx.body = responseObject
      console.log(e.stack)
    }
  }
})

module.exports = router
