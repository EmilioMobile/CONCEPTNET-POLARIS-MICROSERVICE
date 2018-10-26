const MongoClient = require('mongodb')

const getMongoURL = (options) => {
  const url = options.servers
    .reduce((prev, cur) => prev + cur + ',', 'mongodb://')

  return `${url.substr(0, url.length - 1)}/${options.db}`
}

const connect = (options, mediator) => {
  mediator.once('boot.ready', () => {
    MongoClient.connect(
      getMongoURL(options), {
        db: options.dbParameters(),
        server: options.serverParameters(),
        replset: options.replsetParameters(options.repl)
      }, (err, db) => {
        if (err) {
          console.log('Mongo Connection Error')
          mediator.emit('db.error', err)
        }

        db.admin().authenticate(options.user, options.pass, (err, result) => {
          if (err) {
            console.log('Mongo Authentication Error')

            mediator.emit('db.error', err)
          }
          console.log('Mongo Authentication Ready')
          mediator.emit('db.ready', db)
        })
      })
  })
}

module.exports = Object.assign({}, {connect})
