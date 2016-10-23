/////////////////////////////EXAMPLE////////////////////////////////////

const { EventEmitter } = require('events')
/*const httpMock = require('node-mocks-http')
const nock = require('nock') */
const expect = require('chai').expect

const dashboardController = require('../server/controllers/dashboard_controller.js')

describe("Testing HTTP routes related to the dashboard", function () {
  let req, res

  beforeEach(function(done) {
    req = httpMock.createRequest({ params: { carId: ':1234' } })
    res = httpMock.createResponse({ EventEmitter: EventEmitter })
    done()
  })

  it("returns a successful mocked response for vechicle info", function (done) {
    //specify the url to be intercepted

    nock("http://gmapi.azurewebsites.net")
      //define the method to be intercepted
      .post('/getVehicleInfoService')
      //respond with a OK and the specified JSON response
      .reply(200, {
        data: { "vin": { "value": "55555" },
                "color": { "value": "Baby Blue" },
                "fourDoorSedan": { "value": false },
                "driveTrain": { "value": "v6" }
              }
            })

    //perform the request to the api which will now be intercepted by nock
    dashboardController.getVehicleInfo(req, res, (err) => {
      let vehicleInfo = JSON.parse(res._getData())
      expect(vehicleInfo).to.eql({ vin: "55555", color: "Baby Blue", doorCount: 2, driveTrain: "v6" })
      done()
    })
  })

  it("returns a successful mocked response for security info", function (done) {
    //specify the url to be intercepted
    nock("http://gmapi.azurewebsites.net")
      //define the method to be intercepted
      .post('/getSecurityStatusService')
      //respond with a OK and the specified JSON response
      .reply(200, {
        "service": "getSecurityStatus",
        "status": "200",
        "data": {
          "doors": {
            "type": "Array",
            "values": [
              {
                "location": {
                  "type": "String",
                  "value": "frontLeft"
                },
                "locked": {
                  "type": "Boolean",
                  "value": "False"
                }
              },
              {
                "location": {
                  "type": "String",
                  "value": "frontRight"
                },
                "locked": {
                  "type": "Boolean",
                  "value": "True"
                }
              }
            ]
          }
        }
      })

    //perform the request to the api which will now be intercepted by nock
    dashboardController.getSecurityInfo(req, res, (err) => {
      let securityInfo = JSON.parse(res._getData())

      expect(securityInfo).to.eql([
        { location: "frontLeft", locked: false },
        { location: "frontRight", locked: true }
      ])

      done()
    })
  })

  it("returns a successful mocked response for fuel range", function (done) {
    //specify the url to be intercepted
    nock("http://gmapi.azurewebsites.net")
      //define the method to be intercepted
      .post('/getEnergyService')
      //respond with a OK and the specified JSON response
      .reply(200, {
        "service": "getEnergyService",
        "status": "200",
        "data": {
          "tankLevel": {
            "type": "Number",
            "value": "70"
          },
          "batteryLevel": {
            "type": "Null",
            "value": "null"
          }
        }
      })

    //perform the request to the api which will now be intercepted by nock
    dashboardController.getFuelRange(req, res, (err) => {
      let fuelRange = JSON.parse(res._getData())
      expect(fuelRange).to.eql({ percent: 70 })
      done()
    })
  })

  it("returns a successful mocked response for battery range", function (done) {
    //specify the url to be intercepted
    nock("http://gmapi.azurewebsites.net")
      //define the method to be intercepted
      .post('/getEnergyService')
      //respond with a OK and the specified JSON response
      .reply(200, {
        "service": "getEnergyService",
        "status": "200",
        "data": {
          "tankLevel": {
            "type": "Null",
            "value": "Null"
          },
          "batteryLevel": {
            "type": "Number",
            "value": "24"
          }
        }
      })

    //perform the request to the api which will now be intercepted by nock
    dashboardController.getBatteryRange(req, res, (err) => {
      let batteryRange = JSON.parse(res._getData())
      expect(batteryRange).to.eql({ percent: 24 })
      done()
    })
  })
})
