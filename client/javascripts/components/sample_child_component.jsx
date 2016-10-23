const React = require('react')
const { connect } = require('react-redux')
const { startStopEngine } = require('../actions/engine')

const EngineStatus  = React.createClass({
  render() {
    return (
      <div>
        <div>
          <table>
            <tbody>
              <tr>
                <td>Engine Status: </td>
                <td>{ this.props.displayInfo ? this.props.engineStatus : null }</td>
              </tr>
            </tbody>
          </table>

          <span className="engine_button_container">
            <button
              className="button_engine"
              onClick={ () => { this.props.startStopEngine(this.props.engineStatus, this.props.carId) }}
            >
              Engine On/Off Switch
            </button>
          </span>
        </div>
      </div>
    )
  }
})

function mapStateToProps(state) {
  return {
    engineStatus: state.engine.get('engineStatus')
  }
}

function mapDispatchToActions(dispatch) {
  return {
    startStopEngine: (...args) => startStopEngine(dispatch, ...args)
  }
}

module.exports = connect(mapStateToProps, mapDispatchToActions)(EngineStatus)
