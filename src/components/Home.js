import React, { Component } from 'react'
import { connect } from 'react-redux'
import { init_home_products, add_favorite, open_modal, add_to_collection, delete_product } from '../actions/index'
import { Link } from "react-router-dom";
import moment from 'moment'

export class Home extends Component {
  state = {
    homeSearch: '',
    favorite: false,
    sort: ''
  }

  componentDidMount() {
    const { init_home_products } = this.props
    init_home_products()
    this.setState({ currentDisplay: this.props.home_products })
  }

  handleChange = e => {
    const target = e.target
    const name = target.name
    let value = target.type === 'checkbox' ? value = target.checked : value = target.value

    this.setState({
      [name]: value
    })
  }

  addFavorite = (favorite, id) => {
    const { add_favorite } = this.props

    add_favorite(!favorite, id)
  }

  handleAddCollection = item => {
    const { add_to_collection, open_modal } = this.props
    open_modal()
    if(item)
      add_to_collection(item)
  }

  handleDelete = id => {
    const { delete_product  } = this.props
    delete_product(id)
  }

  render() {
    var { home_products } = this.props
    var { homeSearch, favorite, sort } = this.state

    // Title Filter
    if(homeSearch) {
      home_products = home_products.filter(item => item.title.toLowerCase().includes(homeSearch.toLowerCase()))
    }
    // Favorite Filter
    if(favorite) {
      home_products = home_products.filter(item => item.favorite === favorite)
    }
    // Sort Methods
    if(sort === 'asc') {
      home_products = home_products.sort((a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
      });
    } else if(sort === 'desc') {
      home_products = home_products.sort((a, b) => {
        if (a.title.toLowerCase() > b.title.toLowerCase()) return -1;
      });
    } else if(sort === 'dateAsc') {
      home_products = home_products.sort(function(a, b) {
        var dateA = new Date(a.date_created), dateB = new Date(b.date_created)
        return dateA - dateB
      });
    } else if(sort === 'dateDesc') {
      home_products = home_products.sort(function(a, b) {
        var dateA = new Date(a.date_created), dateB = new Date(b.date_created)
        return dateB - dateA
      });
    }

    return (
      <div className="home">
        <div className="primary-heading">
          <h2 className="nasa-collection">NASA Collection</h2>
          <div className="box-btn">
            <Link to="/nasa-search" className="btn btn--purple"><span className="icon icon-add"></span> <span>Add new item</span></Link>
          </div>
        </div>
        {/* Search Bar */}
        <div className="search-bar">
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Search..." name="homeSearch" value={this.state.homeSearch} onChange={this.handleChange} />
          </div>
          <div className="form-group-wrap">
            <div className="form-group">
              <label htmlFor="favorite">Favorite</label>
              <input type="checkbox" className="form-control" name="favorite" checked={this.state.favorite} onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="sort">Sort</label>
              <select name="sort" className="form-control" value={this.state.sort} onChange={this.handleChange} >
                <option value="" disabled defaultValue>Choose sort method</option>
                <option value="asc">Title - ASC</option>
                <option value="desc">Title - DESC</option>
                <option value="dateAsc">Date - ASC</option>
                <option value="dateDesc">Date - DESC</option>
              </select>
            </div>
          </div>
        </div>

        {/* Collection Item */}
        <div className="nasa-search-wrap">
          {home_products && home_products.map(item => {
            return (
              <div key={item.nasaId} className="nasa-search-box">
                <div className="wrap-thumbnail">
                  <Link to={{
                      pathname: `/video/${item.nasaId}`,
                      item,
                    }}>
                    <img src={item.thumbnail} className="thumbnail" alt=""/>
                  </Link>
                  <Link to={{
                      pathname: `/video/${item.nasaId}`,
                      item,
                    }} className="play-icon">
                    <span className="icon icon-play"></span>
                  </Link>
                </div>
                
                <div className="heading">
                  <span className="created-date">{moment(item.date_created).format("MMM Do, YYYY")}</span>
                </div>
                <h3 className="title">{item.title}</h3>
                <p className="description">{`${item.desc.substr(0, 100)}...`}</p>
                <div className="behavior-box">
                  <span 
                    className={`icon ${item.favorite ? 'icon-heart-filled active-favorite' : 'icon-heart'}`}
                    onClick={() => this.addFavorite(item.favorite, item.nasaId)}
                  />
                  <span className="icon icon-trash-bin" onClick={() => this.handleDelete(item.id)}></span>
                  <Link to={{
                      pathname: `/edit/${item.nasaId}`,
                      item,
                      }} 
                      onClick={() => this.handleAddCollection(item)}
                    >
                    <span className="icon icon-pen"></span>
                  </Link>
                  
                </div>
              </div>
              )
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  home_products: state.home_products
})

export default connect(mapStateToProps, {init_home_products, add_favorite, open_modal, add_to_collection, delete_product})(Home)
