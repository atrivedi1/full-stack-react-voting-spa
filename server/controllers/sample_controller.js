'use strict'
//NOTE: If I had more time I would refactor to make this more DRY
const requestPromise = require('request-promise')
const baseGmApiUrl = 'http://gmapi.azurewebsites.net'

const requestOptions = {
  url: null,
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: { id: null, responseType: 'JSON' },
  json: true
}

module.exports = {
  getVehicleInfo: function(req, res, cb) {
    requestOptions.url = baseGmApiUrl + '/getVehicleInfoService'
    requestOptions.body.id = req.params.carId.slice(1)

    requestPromise(requestOptions)
      .then((vehicleInfo) => {
        let doorCount = vehicleInfo.data.fourDoorSedan.value === "True" ? 4 : 2

        let cleanedUpVehicleInfo = {
          vin: vehicleInfo.data.vin.value,
          color: vehicleInfo.data.color.value,
          doorCount: doorCount,
          driveTrain: vehicleInfo.data.driveTrain.value
        }

        res.status(200).json(cleanedUpVehicleInfo)
        cb()
      })
      .catch((err) => res.status(500).send("Uh oh! We're having data issues"))
  },

  getSecurityInfo: function(req, res, cb) {
    requestOptions.url = baseGmApiUrl + '/getSecurityStatusService'
    requestOptions.body.id = req.params.carId.slice(1)

    requestPromise(requestOptions)
      .then((securityInfo) => {

        let cleanedUpSecurityInfo = securityInfo.data.doors.values.map((doorStatus) => {
          return {
            location: doorStatus.location.value,
            locked: doorStatus.locked.value === "True" ? true : false
          }
        })

        res.status(200).json(cleanedUpSecurityInfo)
        cb()
      })
      .catch((err) => res.status(500).send("Uh oh! We're having data issues"))
  },

  getFuelRange: function(req, res, cb) {
    requestOptions.url = baseGmApiUrl + '/getEnergyService'
    requestOptions.body.id = req.params.carId.slice(1)

    requestPromise(requestOptions)
      .then((energyInfo) => {
        let fuelLevel = energyInfo.data.tankLevel.value === "null" ?
                        null :
                        parseInt(energyInfo.data.tankLevel.value)

        let fuelRangeInfo = { "percent": fuelLevel }
        res.status(200).json(fuelRangeInfo)
        cb()
      })
      .catch((err) => res.status(500).send("Uh oh! We're having data issues"))
  },

  getBatteryRange: function(req, res, cb) {
    requestOptions.url = baseGmApiUrl + '/getEnergyService'
    requestOptions.body.id = req.params.carId.slice(1)

    requestPromise(requestOptions)
      .then((energyInfo) => {
        let batteryLevel = energyInfo.data.batteryLevel.value === "null" ?
                           null :
                           parseInt(energyInfo.data.batteryLevel.value)

        let batteryRangeInfo = { "percent": batteryLevel }
        res.status(200).json(batteryRangeInfo)
        cb()
      })
      .catch((err) => res.status(500).send("Uh oh! We're having data issues"))
  }
}
