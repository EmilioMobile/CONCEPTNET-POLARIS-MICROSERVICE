/*
  Conceptnet Route
*/

const Router = require('koa-router')
var ConceptNet = require('../controllers/conceptnet.controller.js')
var NLP = require('../controllers/nlp.controller.js')
var dialogFlowResponseFmt = require('../controllers/dialogflow.controller.js')
var smalltalks = require('../controllers/smalltalk.controller.js')
const router = new Router()
var cNet = new ConceptNet()
var nlp = new NLP()

/*
  Conceptnet query route
*/
router.post('/api/conceptnet/query', async (ctx) => {
  ctx.res.setHeader('Content-Type', 'application/json')
  // extract the data from the request
  console.log(ctx.request.body)
  if (ctx.request.body.queryResult.action === 'polarisx_smalltalk') {
      const smalltalkQuestion = request.body.queryResult.parameters.smalltalk
      if (!smalltalkQuestion){
        ctx.body = dialogFlowResponseFmt('SMALLTALK: Wrong or Missing Parameters')
      }
      else {
        const response = smalltalk.chat(smalltalkQuestion)
        ctx.body = dialogFlowResponseFmt(response)
      }
  }
  else {
    const queryText = ctx.request.body.queryResult.queryText
    const term = ctx.request.body.queryResult.parameters.any
    const relation = ctx.request.body.queryResult.parameters.relation

    if (!queryText || !term || !relation) {
      ctx.body = dialogFlowResponseFmt('CONCEPTNET: QUERY API Wrong or Missing Parameters')
    } else {
      try {
        // conceptnet 5.6 QUERY
        const matches = await cNet.query(term, relation)
        if (matches) {
          const responseText = nlp.analyzeConceptnetScores(matches)
          ctx.body = dialogFlowResponseFmt(responseText)
        } else {
          ctx.body = dialogFlowResponseFmt('CONCEPTNET: No Match')
        }
      } catch (e) {
        console.log(e.stack)
        ctx.body = dialogFlowResponseFmt('CONCEPTNET: QUERY API Error')
      }
    }
  }
})

/*
  Conceptnet lookup route
*/
router.post('/api/conceptnet/lookup', async (ctx) => {
  ctx.res.setHeader('Content-Type', 'application/json')
  // extract the data from the request
  const term = ctx.request.body.queryResult.parameters.any

  if (!term) {
    ctx.body = dialogFlowResponseFmt('CONCEPTNET: LOOKUP API Wrong or Missing Parameters')
  } else {
    try {
      // conceptnet 5.6 LOOKUP
      const output = await cNet.lookup(term)
      let response = JSON.stringify(output)
      ctx.body = dialogFlowResponseFmt(response)
    } catch (e) {
      console.log(e.stack)
      ctx.body = dialogFlowResponseFmt('CONCEPTNET: LOOKUP API Error')
    }
  }
})

module.exports = router
