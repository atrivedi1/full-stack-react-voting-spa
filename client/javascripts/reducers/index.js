const { routerReducer } = require('react-router-redux')
const { combineReducers } = require('redux')

const DashboardReducer = require('./dashboard_reducer')
const EngineReducer = require('./engine_reducer')

module.exports = combineReducers({
  dashboard: DashboardReducer,
  engine: EngineReducer,
})
