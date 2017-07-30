const Alexa = require('alexa-sdk')

const APP_ID = undefined

const SKILL_NAME = 'TFL Train Status'

exports.handler = function(event, context, callback) {
  const alexa = Alexa.handler(event, context)
  alexa.APP_ID = APP_ID
  alexa.registerHandlers(handlers)
  alexa.execute()
}

const handlers = {
  LaunchRequest: function() {
    this.emit('GetNewFactIntent')
  },
  GetTflTrainStatusIntent: function() {
    const status = 'bad'
    this.emit(':tellWithCard', status, SKILL_NAME, status)
  }
}
