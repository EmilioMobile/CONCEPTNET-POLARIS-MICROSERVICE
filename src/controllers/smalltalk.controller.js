

class PolarisXSmalltalk {
  chat (input) {
      return new Promise((resolve, reject) => {
          resolve('Hi I am the small talk module, you wanted a answer for ' + input + '?')
      })
  }
}

module.exports = PolarisXSmalltalk