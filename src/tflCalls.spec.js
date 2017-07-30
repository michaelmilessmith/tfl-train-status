const { getTflTrainDisruption } = require('./tflCalls')

jest.mock('superagent', () => ({
  get: jest.fn()
}))

const request = require('superagent')

const requestMock = {
  query: jest.fn(),
  then: jest.fn()
}

const responseBody = [
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

describe('getTflTrainDisruption', () => {
  it('returns the status of the tfl trains', () => {
    request.get.mockReturnValue(requestMock)
    requestMock.query.mockReturnValue(Promise.resolve({ body: responseBody }))

    return expect(getTflTrainDisruption()).resolves.toBe(responseBody)
  })
})
