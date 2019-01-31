import React, { Component } from 'react'
import '../styles/modal.scss'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { add_product, close_modal, edit_product } from '../actions/index'

export class FormModal extends Component {
  state = {
    select: null,
    isModal: this.props.isModal,
    title: '',
    desc: '',
    media_type: '',
    thumbnail: '',
    videoUrl: '',
    redirect: false,
    nasaId: this.props.product.nasaId
  }

  componentDidMount() {
    const { product } = this.props

    this.setState({
      title: product.title,
      desc: product.desc,
      media_type: product.media_type,
      thumbnail: product.thumbnail,
      videoUrl: product.videoUrl,
      nasaId: product.nasaId
    })
  }

  handleChange = e => {
    const target = e.target
    const value = target.value

    this.setState({
      [target.name]: value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { add_product, product, location, edit_product, close_modal } = this.props
    var isEdit = null

    this.setState({ redirect: true })
    if(location && location.pathname) {
      isEdit = location.pathname.includes('edit')
    }
    if(isEdit) {
      const newProduct = {
        title: this.state.title,
        desc: this.state.desc,
        media_type: this.state.media_type,
        thumbnail: this.state.thumbnail,
        videoUrl: this.state.videoUrl,
        nasaId: this.state.nasaId
      }
      edit_product(newProduct)
    } else {
      add_product(product)
    }

    close_modal()
  }

  handleCloseModal = () => {
    const { location, close_modal } = this.props
    var isEdit = null

    if(location && location.pathname) {
      isEdit = location.pathname.includes('edit')
    }

    if(isEdit) {
      this.setState({ redirect: true })
      close_modal()
    } else {
      close_modal()
    }
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }
  }

  render() {
    const { product, global_reducer, close_modal, location } = this.props
    const { 
      title,
      desc,
      media_type,
      thumbnail,
      videoUrl
     } = this.state
    var isEdit = null

    if(location && location.pathname) {
      isEdit = location.pathname.includes('edit')
    }
     
    return (
      <div className={ `modal-overlay ${global_reducer.isModal ? 'active-modal' : ''}` }>
        <div className="form-modal">
          <div className="modal-heading">
            <h2 className="modal-title">{ isEdit ? 'Edit' : 'Add to collection'}</h2>
            <span style={{cursor: 'pointer'}} className="icon icon-close" onClick={() => this.handleCloseModal()}></span>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="text">Title</label>
              <input 
                placeholder={isEdit ? title : product.title}
                type="text" 
                className="form-control" 
                name="title" 
                value={isEdit ? title : product.title}
                disabled={isEdit ? false : true}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="desc">Description</label>
              <textarea 
                placeholder={isEdit ? desc : product.desc}
                type="text" 
                className="form-control" 
                name="desc" 
                value={isEdit ? desc : product.desc}
                disabled={isEdit ? false : true}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="type">Type</label>
              <select 
                className="form-control" 
                name="type" 
                defaultValue={isEdit ? media_type : product.media_type}
                onChange={this.handleChange}
                disabled={isEdit ? false : true}
              >
                <option value={isEdit ? media_type : product.media_type}>Video</option>
                <option value="saab">Saab</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="thumbnail">Link preview image url</label>
              <input 
                placeholder={isEdit ? thumbnail : product.thumbnail}
                type="text" 
                className="form-control" 
                name="thumbnail" 
                value={isEdit ? thumbnail : product.thumbnail}
                disabled={isEdit ? false : true}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="videoUrl">Link file url</label>
              <input 
                placeholder={isEdit ? videoUrl : product.videoUrl}
                type="text" 
                className="form-control" 
                name="videoUrl" 
                value={isEdit ? videoUrl : product.videoUrl}
                disabled={isEdit ? false : true}
                onChange={this.handleChange}
              />
            </div>
            <button type="submit" className="btn btn--purple" value="submit"><span className="icon icon-check left"></span> { isEdit ? 'Save' : 'Add to collection'}</button>
          </form>
          {this.renderRedirect()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  product: state.collection_product,
  global_reducer: state.global_reducer
})

export default connect(mapStateToProps, {add_product, close_modal, edit_product})(FormModal)
