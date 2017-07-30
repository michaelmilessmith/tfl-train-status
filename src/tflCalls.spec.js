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
  beforeEach(() => {
    jest.resetAllMocks()
  })
  it('returns the status of the tfl trains', async () => {
    request.get.mockReturnValue(requestMock)
    requestMock.query.mockReturnValue(Promise.resolve({ body: responseBody }))

    await expect(getTflTrainDisruption()).resolves.toBe(responseBody)
    expect(request.get).toHaveBeenCalledTimes(1)
    expect(request.get).toHaveBeenCalledWith(
      'https://api.tfl.gov.uk/Line/Mode/tube/Disruption'
    )
    expect(requestMock.query).toHaveBeenCalledTimes(1)
    expect(requestMock.query).toHaveBeenCalledWith({
      app_id: process.env.TFL_APP_ID,
      app_key: process.env.TFL_APP_KEY
    })
  })
})
