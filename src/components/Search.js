import React, { Component } from 'react'
import Loader from './Loader'
import moment from 'moment'
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { search_products_request, add_to_collection, close_modal, open_modal } from '../actions/index'
import FormModal from './FormModal'

export class Search extends Component {
  state = {
    name: '',
    items: [],
    isModal: false,
    formItem: [],
    isLoading: false
  }

  componentWillReceiveProps(nextProps) {
    const products = nextProps.products
    if(products && products.length > 0) {
      this.setState({ isLoading: false })
    }
  }

  handleChange = (e) => {
    this.setState({ name: e.target.value })
  }
  
  searchItem = (e) => {
    const { search_products_request } = this.props

    if(e.key === 'Enter') {
      const { name } = this.state
      search_products_request(name)
      
      this.setState({ isLoading: true })
    }
  }

  openModal = () => {
    this.setState({ isModal: true })
  }

  closeModal = () => {
    this.setState({ isModal: false })
  }

  handleAddCollection = item => {
    const { add_to_collection, open_modal } = this.props
    open_modal()
    if(item)
      add_to_collection(item)
  }

  render() {
    const { items, name, isModal, formItem, isLoading } = this.state
    const { products } = this.props

    return (
      <div className="nasa-search">
        <div className="breadcrumb">
          <Link to="/" className="breadcrumb-item">
            <span className="icon icon-back"></span>
            <span className="btn-add-text">Back to Collection</span>
          </Link>
        </div>
        <h2 className="nasa-search-title">Search from Nasa</h2>

        <div className="form-group">
          <input placeholder="Type something to search..." type="text" className="nasa-search-input form-control"
            value={this.state.name}
            onChange={this.handleChange}
            onKeyUp={this.searchItem}
          />
        </div>

        <FormModal isModal={isModal} formItem={formItem} />

        <p className="result-total" style={{display: items.length > 0 ? 'block' : 'none' }} >{`${items.length} result for ${name}`}</p>

        {isLoading ? <Loader style={{marginBottom: '20px;'}} /> : '' }

        <div className="nasa-search-wrap">
          {products && products.map(item => {
            return (
              <div key={item.nasaId} className="nasa-search-box" same-height-wrap="true" style={{ display : products ? 'block' : 'none'}}>
                <a href="#"><img src={item.thumbnail} className="thumbnail" alt=""/></a>
                <div className="heading">
                  <span className="created-date">{moment(item.date_created).format("MMM Do, YYYY")}</span>
                </div>
                <h3 className="title" same-height-header="true">{item.title}</h3>
                <p className="description" same-height-body="true">{`${item.desc.substr(0, 100)}...`}</p>
                <Link to={{
                    pathname: `/nasa-search`,
                    item,
                    }} 
                    className="add-collection-box"
                    onClick={() => this.handleAddCollection(item)}
                  >
                  <span className="icon icon-add"></span>
                  <span className="btn-add-text">Add to NASA collection</span>
                </Link>
              </div>
            )
          })}
        </div>
        
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products
})

export default connect(mapStateToProps, {search_products_request, add_to_collection, close_modal, open_modal})(Search)
