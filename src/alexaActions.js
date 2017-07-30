const { getTflTrainDisruption } = require('./tflCalls')

const getTflTrainStatus = () => {
  const response = getTflTrainDisruption()
  return response.map(disruption => disruption.description).join('')
}

module.exports = {
  getTflTrainStatus
}
