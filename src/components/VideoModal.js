import React, { Component } from 'react'
import '../styles/modal.scss'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { close_modal } from '../actions/index'

export class VideoModal extends Component {
  state = {
    redirect: false
  }

  handleCloseModal = () => {
    this.setState({ redirect: true })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }
  }

  render() {
    const { location } = this.props

    return (
      <div className="modal-video">
        <div className="modal-wrap">
          <div className="modal-heading">
            <h2 className="modal-title">{location.item.title}</h2>
            <span style={{cursor: 'pointer'}} className="close-btn icon icon-close" onClick={() => this.handleCloseModal()}></span>
          </div>
          <div className="modal-body">
            <video width="100%" height="100%" controls className="video-player">
              <source src={location.item.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        {this.renderRedirect()}
      </div>
    )
  }
}

export default connect(null, {close_modal})(VideoModal)
