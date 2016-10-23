const React = require('react')
const { connect } = require('react-redux')

const Dashboard = require('./dashboard')

const AppContainer = React.createClass({
  render() {
    return (
      <Dashboard />
    )
  }
})

module.exports = connect(_.identity)(AppContainer)
