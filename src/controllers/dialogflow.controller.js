
module.exports = function (data) {
  let responseObject = {
    'fulfillmentText': data,
    'fulfillmentMessages': [],
    // 'fulfillmentMessages': [{'text': {'text': [response]}}],
    'source': 'CONCEPTNET'
  }
  return responseObject
}
