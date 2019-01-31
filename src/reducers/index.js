import { combineReducers } from 'redux'
import global_reducer from './global-reducer'
import home_products from './home-product-reducer'
import collection_product from './collection-product-reducer'
import products from './products-reducer'

const rootReducer = combineReducers({
  products,
  collection_product,
  home_products,
  global_reducer
})

export default rootReducer