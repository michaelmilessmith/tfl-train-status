const { getTflTrainStatus } = require('./alexaActions')

jest.mock('./tflCalls', () => ({
  getTflTrainDisruption: jest.fn()
}))

const { getTflTrainDisruption } = require('./tflCalls')

const getTflTrainDisruptionResponse = [
  {
    $type:
      'Tfl.Api.Presentation.Entities.Disruption, Tfl.Api.Presentation.Entities',
    category: 'RealTime',
    type: 'routeInfo',
    categoryDescription: 'RealTime',
    description:
      'Northern Line: MINOR DELAYS between Camden Town and Kennington via Charing Cross due to a signal failure at Kennington. ',
    affectedRoutes: [],
    affectedStops: [],
    closureText: 'minorDelays'
  },
  {
    $type:
      'Tfl.Api.Presentation.Entities.Disruption, Tfl.Api.Presentation.Entities',
    category: 'RealTime',
    type: 'lineInfo',
    categoryDescription: 'RealTime',
    description:
      'Waterloo and City Line: The service will resume again at 0615 tomorrow. ',
    affectedRoutes: [],
    affectedStops: [],
    closureText: 'serviceClosed'
  }
]

describe('getTflTrainStatus', () => {
  it('returns the status of the TFL train network in a human readable format', async () => {
    getTflTrainDisruption.mockReturnValue(
      Promise.resolve(getTflTrainDisruptionResponse)
    )
    await expect(getTflTrainStatus()).resolves.toBe(
      'Northern Line: MINOR DELAYS between Camden Town and Kennington via Charing Cross due to a signal failure at Kennington. Waterloo and City Line: The service will resume again at 0615 tomorrow. '
    )
    expect(getTflTrainDisruption).toHaveBeenCalledTimes(1)
  })
})
