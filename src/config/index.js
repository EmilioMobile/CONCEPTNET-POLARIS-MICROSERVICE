// const {dockerSettings, serverSettings} = require('./config')
// const {initDI} = require('./di')
// const init = initDI.bind(null, {serverSettings, dockerSettings})
const {dbSettings, serverSettings} = require('./config')
const db = require('./mongo')

module.exports = Object.assign({}, {dbSettings, serverSettings, db})

// module.exports = Object.assign({}, {init})
