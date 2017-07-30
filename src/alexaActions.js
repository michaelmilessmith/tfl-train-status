const { getTflTrainDisruption } = require('./tflCalls')

const getTflTrainStatus = () =>
  getTflTrainDisruption().then(res =>
    res.map(disruption => disruption.description).join('')
  )

module.exports = {
  getTflTrainStatus
}
