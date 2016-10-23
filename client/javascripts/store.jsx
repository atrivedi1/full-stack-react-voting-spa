const { createStore, applyMiddleware } = require('redux')
const { browserHistory } = require('react-router')
const { routerMiddleware } = require('react-router-redux')

const reducers = require('./reducers/index')

module.exports = createStore(
  reducers,
  applyMiddleware(
    routerMiddleware(browserHistory)
  )
)
