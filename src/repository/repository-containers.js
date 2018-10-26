'use strict'
const repository = (container) => {
  return Object.create({})
}

const connect2 = (container) => {
  return new Promise((resolve, reject) => {
    resolve(repository(container))
  })
}

module.exports = Object.assign({}, {connect2})
