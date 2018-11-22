var natural = require('natural')

var tokenizer = new natural.WordTokenizer()
var regTokenizer = new natural.RegexpTokenizer({pattern: ' '})
var treeTokenizer = new natural.TreebankWordTokenizer()

class Agent {

  /*
    Regular expressions are used with the RegExp methods test and exec and with the String methods match,
    replace, search, and split. These methods are explained in detail in the JavaScript reference.
  */

  clean (text) {
    return text
  }

  tokenize (text) {
    let tokenizer0 = tokenizer.tokenize(text)
    let tokenizer1 = regTokenizer.tokenize(text)
    let tokenizer2 = treeTokenizer.tokenize(text)

    console.log(tokenizer0)
    console.log(tokenizer1)
    console.log(tokenizer2)

    for (let item of tokenizer0) {
      this.stemmer(item)
    }

   // natural.PorterStemmer.attach()
   // console.log('How about a running'.tokenizeAndStem())
  }

  /* Stemming
    Reducing word to it base form or stems
    Normalization: PorterStemmer, LancasterStemmer
  */

  stemmer (word) {
    console.log(natural.PorterStemmer.stem(word))
    console.log(natural.LancasterStemmer.stem(word))
  }

  /*
    Will select the highest weight from the array of surfaceText
    replied from conceptnet
  */
  analyzeConceptnetScores (responses) {
    let maxWeight = 0
    let response = "Sorry, i don't know ...'"
    for (let i = 0; i < responses.length; i++) {
      if (responses[i].weight > maxWeight) {
        response = this.clean(responses[i].surfaceText)
        maxWeight = responses[i].weight
      }
    }
    return response
  }

  /*
    Will select the best match within the queryText from the
    array of surfaceText replied from conceptnet
  */
  analyzeConceptnetMatch (queryText, responses) {
    let maxMatch = queryText.length + 1
    let response = "Sorry, i don't know ..."
    for (let i = 0; i < responses.length; i++) {
      // extract the term matching the first [[ ... ]] ocurrence
      var rx = /\[\[(.*?)\]\]/g
      const match = rx.exec(responses[i].surfaceText)
      // find the text query in the selection of surfaceText from Conceptnet
      const matchPosition = queryText.search(match[1])
      if (matchPosition >= 0 && matchPosition < maxMatch) {
        response = this.clean(responses[i].surfaceText)
        maxMatch = matchPosition
      }
    }
    return response
  }
}

module.exports = Agent
