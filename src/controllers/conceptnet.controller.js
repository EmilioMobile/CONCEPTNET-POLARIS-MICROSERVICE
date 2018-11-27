/*
  Javascript Controller Implementing Access
  to CONCEPTNET 5.6 Network Service
  http://api.conceptnet.io

  APIs Supported:
  QUERY:
    http://api.conceptnet.io/query?rel=/r/(relation)&start=/c/en/'
  LOOKUP:
    http://api.conceptnet.io/c/en/
*/

var unirest = require('unirest')

var ConceptNetRelations = [
  'RelatedTo',
  'ExternalURL',
  'FormOf',
  'IsA',
  'PartOf',
  'HasA',
  'UsedFor',
  'CapableOf',
  'AtLocation',
  'Causes',
  'HasSubevent',
  'HasFirstSubevent',
  'HasLastSubevent',
  'HasPrerequisite',
  'HasProperty',
  'MotivatedByGoal',
  'ObstructedBy',
  'Desires',
  'CreatedBy',
  'Synonym',
  'Antonym',
  'DistinctFrom',
  'DerivedFrom',
  'SymbolOf',
  'DefinedAs',
  'Entails',
  'MannerOf',
  'LocatedNear',
  'HasContext',
  'dbpedia/...',
  'SimilarTo',
  'EtymologicallyRelatedTo',
  'EtymologicallyDerivedFrom',
  'CausesDesire',
  'MadeOf',
  'ReceivesAction',
  'InstanceOf'
]

var relationString = {
  'RelatedTo': 'is related to',
  'ExternalURL': 'is related to',
  'FormOf': 'is a form of',
  'IsA': 'is a',
  'PartOf': 'is part of',
  'HasA': 'has a',
  'UsedFor': 'is used for',
  'CapableOf': 'is capable of',
  'AtLocation': 'is at location',
  'Causes': 'causes',
  'HasSubevent': 'has subevent',
  'HasFirstSubevent': 'has first subevent',
  'HasLastSubevent': 'has last subevent',
  'HasPrerequisite': 'has a prerequisite',
  'HasProperty': 'has a property',
  'MotivatedByGoal': 'is motivated by',
  'ObstructedBy': 'is obstructed by',
  'Desires': 'desires',
  'CreatedBy': 'is created by',
  'Synonym': 'is synonym of',
  'Antonym': 'is antonym of',
  'DistinctFrom': 'is distinct from',
  'DerivedFrom': 'is derived from',
  'SymbolOf': 'symbol is',
  'DefinedAs': 'is defined as',
  'Entails': 'entails',
  'MannerOf': 'is a manner of',
  'LocatedNear': 'is located near',
  'HasContext': 'has a context of',
  'dbpedia/...': 'dbpedia',
  'SimilarTo': 'is similar to',
  'EtymologicallyRelatedTo': 'is related to',
  'EtymologicallyDerivedFrom': 'derives from',
  'CausesDesire': 'causes desire of',
  'MadeOf': 'is made of',
  'ReceivesAction': 'receives action of',
  'InstanceOf': 'an instance of'
}

class Conceptnet {

  /*
   QUERY for term relationships ( edges ) in Conceptnet 5.6
  */
  query (term, relation) {
    return new Promise((resolve, reject) => {
      if (term !== undefined || relation !== undefined) {
        // Check if the relation is defined in Conceptnet 5.6
        if (this.isAConceptNetRelation(relation)) {
          try {
            console.log(relation)
            var request = unirest.get('http://api.conceptnet.io/query?rel=/r/' + relation + '&start=/c/en/' + term.toLowerCase())
            request.send().end(function (response) {
              if (response.error) {
                reject(response.error)
              } else {
                var surfaceTextResponse = []
                var edges = response.body.edges
                edges.forEach(function (entry) {
                  entry.surfaceText = '[[' + entry.start.label + ']] ' + relationString[entry.rel.label] + ' [[' + entry.end.label + ']]'
                  if (entry.surfaceText) {
                    console.log(entry)
                    console.log(entry.surfaceText)
                    surfaceTextResponse.push({ surfaceText: entry.surfaceText, weight: entry.weight })
                  }
                })
                resolve(surfaceTextResponse)
              }
            })
          } catch (e) {
            console.log(e.stack)
            reject('CONCEPTNET QUERY Error, Concepnet Network service is not available.')
          }
        } else {
          console.log('CONCEPTNET QUERY Error, the relation is not supported.')
          reject('CONCEPTNET QUERY Error, the relation is not supported.')
        }
      } else {
        console.log('CONCEPTNET QUERY Error, undefined parameters.')
        reject('CONCEPTNET QUERY Error, undefined parameters.')
      }
    })
  }

  /*
   LOOKUP for term nodes in Conceptnet 5.6
  */
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
          reject('CONCEPTNET QUERY Error, Concepnet Network service is not available.')
        }
      } else {
        console.log('CONCEPTNET QUERY Error, Undefined parameters.')
        reject('CONCEPTNET QUERY Error, Undefined parameters.')
      }
    })
  }

  isAConceptNetRelation (relation) {
    return (ConceptNetRelations.find(item => item === relation) !== undefined)
  }
}

module.exports = Conceptnet
