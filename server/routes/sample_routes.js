//////////////////////////////EXAMPLE/////////////////////////////////


const controller = require('../controllers')

function router(app) {
  //dashboard related routes
  app.get("/vehicles/:carId", controller.dashboard.getVehicleInfo)

  app.get("/vehicles/:carId/doors", controller.dashboard.getSecurityInfo)

  app.get("/vehicles/:carId/fuel", controller.dashboard.getFuelRange)

  app.get("/vehicles/:carId/battery", controller.dashboard.getBatteryRange)

  //engine related routes
  app.post("/vehicles/:carId/engine", controller.engine.startStopEngine)
}

module.exports = router
