const Alexa = require('alexa-sdk')
const alexaActions = require('./src/alexaActions')

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
    this.emit('GetTflTrainStatusIntent')
  },
  GetTflTrainStatusIntent: function() {
    alexaActions.getTflTrainStatus().then(res => {
      this.emit(':tellWithCard', res, SKILL_NAME, res)
    })
  }
}
