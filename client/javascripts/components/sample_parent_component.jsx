const React = require('react')
const { connect } = require('react-redux')

const { selectCar, fetchCarData } = require('../actions/dashboard')
const EngineStatus = require('./engine')

const Dashboard = React.createClass({
  render() {
    return (
      <div>
        <div className="select_button_wrapper">
          <div className="styled-select">
            <select onChange={ (selected) => this.props.selectCar(selected) }>
              <option value="1234">1234</option>
              <option value="1235">1235</option>
            </select>
          </div>

          <div className="select_vehicle_button_container">
            <button
              className="button_select_vehicle"
              onClick={ () => {
                this.props.fetchCarData(this.props.carId) } }>
              Select Vehicle
            </button>
          </div >
        </div>

        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Data</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Vehicle Info: </td>
              <td>{ this.props.carInformation.get('vehicleInfo') }</td>
            </tr>

            <tr>
              <td>Security: </td>
              <td>{ this.props.carInformation.get('securityInfo') }</td>
            </tr>

            <tr>
              <td>Fuel Range: </td>
              <td>{ this.props.carInformation.get('fuelRange') }</td>
            </tr>

            <tr>
              <td>Battery Range: </td>
              <td>{ this.props.carInformation.get('batteryRange') }</td>
            </tr>
          </tbody>
        </table>

        <EngineStatus
          carId={ this.props.carId }
          displayInfo={ this.props.displayEngineInfo }
        />
      </div>
    )
  }
})

function mapStateToProps(state) {
  return {
    carId: state.dashboard.get('carId'),
    carInformation: state.dashboard.get('carInformation'),
    displayEngineInfo: state.dashboard.get('displayEngineInfo')
  }
}

function mapDispatchToActions(dispatch) {
  return {
    selectCar: (...args) => selectCar(dispatch, ...args),
    fetchCarData: (...args) => fetchCarData(dispatch, ...args)
  }
}

module.exports = connect(mapStateToProps, mapDispatchToActions)(Dashboard)
