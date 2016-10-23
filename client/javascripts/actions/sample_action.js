const baseUrl = 'http://localhost:3000'

function selectCar(dispatch, selected) {
  let carSelected = selected.target.value

  dispatch({
    type: "CAR_SELECTED",
    carSelected
  })
}

function fetchCarData(dispatch, carId) {
  let paths = ["", '/doors', '/fuel', '/battery']

  let pathInfoType = {
    "": "vehicle info",
    "/doors": "security info",
    "/fuel": "fuel info",
    "/battery": "battery info"
  }

  let arrayOfRequests = []

  paths.forEach((path) => {
    arrayOfRequests.push($.ajax({
      type: 'GET',
      url: baseUrl + '/vehicles/:' + carId + path,
      data: { carId: carId },
      success: function(data) {
        console.log(pathInfoType[path] +  " request complete")
      }
    }))
  })

  $.when.apply($, arrayOfRequests)
   .then((dataFromVehicleReq, dataFromSecurityReq, dataFromFuelReq, dataFromBatteryReq) => {
    let vehicleInfo = dataFromVehicleReq[0]
    let securityInfo = dataFromSecurityReq[0]
    let fuelRange = dataFromFuelReq[0]
    let batteryRange = dataFromBatteryReq[0]

    dispatch(retrievedCarData(vehicleInfo, securityInfo, fuelRange, batteryRange))
  })
}

function retrievedCarData(vehicleInfo, securityInfo, fuelRange, batteryRange) {
  let carData = {
    vehicleInfo: vehicleInfo,
    securityInfo: securityInfo,
    fuelRange: fuelRange,
    batteryRange: batteryRange
  }

  return {
    type: "DATA_FOR_CAR_RETRIEVED",
    carData
  }
}

module.exports = {
  selectCar,
  fetchCarData
}

