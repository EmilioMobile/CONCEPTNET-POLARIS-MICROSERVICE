

class PolarisXSmalltalk {
  chat (input) {
      return new Promise((resolve, reject) => {
        switch (input) {
          case "Hi": {
            resolve('Hi, I am PolarisX bot, i can describe terms or things, please check the list of relations in the right side')
          }

          case "Ok": {
            resolve('')
          }

          case "what time is it": {
            var d = new Date()
            var now = 'Now is ' + d.getUTCHours() + ':' + d.getUTCMinutes() + ':'+ d.getUTCSeconds()
            resolve(now)
          }

          case "which day is today": {
            var d = new Date();
            var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
            var day = weekday[d.getUTCDay()]
            var now = 'Today is ' + day
            resolve(now)
          }

          case "which month is today": {
            var d = new Date();
            var weekday = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
            var month = weekday[d.getUTCMonth()]
            var now = 'We are in ' + month
            resolve(now)
          }

          case "which date is today": {
            var d = new Date()
            var n = d.toUTCString()
            var now = 'Today is ' + n
            resolve(now)
          }

          case "where are you": {
            resolve('I am in Korea')
          }

          case "who are you": {
            resolve('I am PolarisX bot')
          }

          case "how are you": {
            resolve('Is cold in Seoul, so i catched a cold')
          }

          case "what is the weather": {
            resolve('Today is cold, very very cold')
          }

          case "what can you do": {
            resolve('I use conceptnet to describe terms meanings and relationships')
          }

          default: {
            resolve('Hi I am the small talk module, you wanted a answer for ' + input + '?')
          }
        }
      })
  }
}

module.exports = PolarisXSmalltalk