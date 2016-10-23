const React = require('react')
window._ = require('lodash')
window.$ = require('jquery')

const { render } = require('react-dom')
const { Provider } = require('react-redux')

const AppContainer = require('./components/app')
const store = require('./store')

render(
  <Provider store={ store }>
    <AppContainer />
  </Provider>,
  document.getElementById('app-container')
)
