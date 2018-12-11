

class PolarisXSmalltalk {
  chat (input) {
      return new Promise((resolve, reject) => {
        switch (input) {
          case "what time is it": {
            console.log('what time is it')
            var d = new Date()
            var now = 'Now is ' + d.getUTCHours() + ':' + d.getUTCMinutes() + ':'+ d.getUTCSeconds()
            resolve(now)
          }

          case "where are you": {
            resolve('I am in Korea')
          }

          case "what is the weather today": {
            resolve('Today is cold, very very cold')
          }

          default: {
            resolve('Hi I am the small talk module, you wanted a answer for ' + input + '?')
          }
        }
      })
  }
}

module.exports = PolarisXSmalltalk