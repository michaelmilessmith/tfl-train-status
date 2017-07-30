const request = require('superagent')

const modes = ['tube']

const getTflTrainDisruption = () =>
  request
    .get(`https://api.tfl.gov.uk/Line/Mode/${modes.join(',')}/Disruption`)
    .query({
      app_id: process.env.TFL_APP_ID,
      app_key: process.env.TFL_APP_KEY
    })
    .then(res => res.body)
    .catch(err => console.log(err))

module.exports = {
  getTflTrainDisruption
}
