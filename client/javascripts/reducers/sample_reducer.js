const Immutable = require('immutable')

const initialDashboardState = Immutable.fromJS({
  carId: "1234",
  carInformation: {
    vehicleInfo: "",
    securityInfo: "",
    fuelRange: "",
    batteryRange: "",
  },
  displayEngineInfo: false
})

function DashboardReducer(state, action) {
  state = state ? state : initialDashboardState

  if (!(action instanceof Immutable.Map)) {
    action = Immutable.fromJS(action)
  }

  switch (action.get('type')) {
    case "CAR_SELECTED": {
      return state.set('carId', action.get('carSelected'))
    }

    case "DATA_FOR_CAR_RETRIEVED": {
      //vehicle information
      let vehicleDoorCount = action.getIn(['carData', 'vehicleInfo', 'doorCount'])
      let vehicleColor = action.getIn(['carData', 'vehicleInfo', 'color']).toLowerCase()
      let vehicleDriveTrain = action.getIn(['carData', 'vehicleInfo', 'driveTrain'])
      let vehicleVin = action.getIn(['carData', 'vehicleInfo', 'vin'])

      let vehicleInfo =
        vehicleDoorCount + " door " +
        vehicleColor + " " +
        vehicleDriveTrain +
        " (VIN:" + vehicleVin + ")"

      //security information

      let rawSecurityInfo = action.getIn(['carData', 'securityInfo']).toJS()
      let securityInfoArr = [];

      rawSecurityInfo.forEach((door) => {
        let rawDoorLocation = door.location.toLowerCase()

        let doorLocation = rawDoorLocation.indexOf("front") > -1 ?
                           rawDoorLocation.replace("front", "front-") :
                           rawDoorLocation.replace("back", "back-")

        let lockStatus = door.locked === true ? "locked" : "unlocked"
        securityInfoArr.push(doorLocation + " door is " + lockStatus)
      })

      let securityInfo = securityInfoArr.join("; ")

      //energy information
      let rawFuelData = action.getIn(['carData', 'fuelRange', 'percent'])
      let rawBatteryData = action.getIn(['carData', 'batteryRange', 'percent'])

      let fuelRange = rawFuelData !== null ? rawFuelData + "%" : "N/A"
      let batteryRange = rawBatteryData !== null ? rawBatteryData + "%" : "N/A"

      //update state
      return state
        .setIn(['carInformation','vehicleInfo'], vehicleInfo)
        .setIn(['carInformation','securityInfo'], securityInfo)
        .setIn(['carInformation','fuelRange'], fuelRange)
        .setIn(['carInformation','batteryRange'], batteryRange)
        .set('displayEngineInfo', true)
    }

    default: {
      return state
    }
  }
}

module.exports = DashboardReducer
