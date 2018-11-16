var unirest = require('unirest')

class Conceptnet {

  // look for term relationships ( edges ) in Conceptnet 5.6
  query (term, relation) {
    return new Promise(function (resolve, reject) {
      if (term !== undefined || relation !== undefined) {
        try {
          var request = unirest.get('http://api.conceptnet.io/query?rel=/r/' + relation + '&start=/c/en/' + term)
          request.send().end(function (response) {
            if (response.error) {
              reject(response.error)
            } else {
              resolve(response)
            }
          })
        } catch (e) {
          console.log(e.stack)
          reject('Conceptnet query error')
        }
      } else {
        reject('Concepnet query error, term or relation are undefined')
        console.log('Conceptnet query error, term or relation are undefined undefined')
      }
    })
  }

  // look for term nodes in Conceptnet 5.6
  lookup (term) {
    return new Promise(function (resolve, reject) {
      if (term !== undefined) {
        try {
          var request = unirest.get('http://api.conceptnet.io/c/en/' + term)
          request.send().end(function (response) {
            if (response.error) {
              reject(response.error)
            } else {
              resolve(response)
            }
          })
        } catch (e) {
          console.log(e.stack)
          reject('Concepnet lookup error')
        }
      } else {
        reject('Conceptnet lookup error, term is undefined')
        console.log('Conceptnet lookup error, term is undefined')
      }
    })
  }
}

module.exports = Conceptnet
