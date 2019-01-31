import axios from 'axios'
import * as actionTypes from './types'
import uuid from 'uuid/v4'

export const search_products_request = (name) => {
  return dispatch => {
    axios.get(`https://images-api.nasa.gov/search?q=${name}`)
      .then((res) => {
        let products = res.data.collection.items.filter(item => item.href.includes('video'))
        var nasaItem = []
        
        for(let i = 0; i < products.length; i++) {
          for(let e = 0; e < products[i].data.length; e++) {
            let nasaId = products[i].data[e].nasa_id
            axios.get(`https://images-api.nasa.gov/asset/${nasaId}`)
              .then(res => {
                let videoLink = res.data.collection.items[0].href
                let product = products[i].data[e]
                let box = res.data.collection.items.filter(item => item.href.includes('~mobile_thumb'))
                let thumbnail = box[0].href
                let item = {
                  id: uuid(),
                  favorite: false,
                  thumbnail,
                  date_created: product.date_created,
                  title: product.title,
                  media_type: product.media_type,
                  nasaId,
                  desc: product.description,
                  keywords: product.keywords, 
                  videoUrl: videoLink
                }
                nasaItem.push(item)
                dispatch(search_products(nasaItem))
              })
              .catch(err => console.log(err))
          }
        }
      })
      .catch(err => console.log(err))
  }
}

const search_products = products => {
  return {
    type: actionTypes.SEARCH_PRODUCTS,
    products
  }
}

export const add_to_collection = product => {
  return {
    type: actionTypes.ADD_TO_COLLECTION,
    product
  }
}

// Home Products
export const add_product = product => {
  return {
    type: actionTypes.ADD_PRODUCT,
    product
  }
}
export const init_home_products = () => {
  return {
    type: actionTypes.INIT_HOME_PRODUCT
  }
}
export const edit_product = product => {
  return {
    type: actionTypes.EDIT_PRODUCT,
    product
  }
}
export const delete_product = id => {
  return {
    type: actionTypes.DELETE_PRODUCT,
    id
  }
}
export const add_favorite = (favorite, id) => {
  return {
    type: actionTypes.ADD_FAVORITE,
    favorite,
    id
  }
}

// Modal
export const open_modal = () => {
  return {
    type: actionTypes.OPEN_MODAL
  }
}
export const close_modal = () => {
  return {
    type: actionTypes.CLOSE_MODAL
  }
}