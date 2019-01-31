import React, { Component } from 'react'

export class Loader extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="lds-hourglass"></div>
      </React.Fragment>
    )
  }
}

export default Loader