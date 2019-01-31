import * as actionTypes from '../actions/types'

const initialProduct = []

const products_reducer = (state = initialProduct, action) => {
  switch(action.type) {
    case actionTypes.SEARCH_PRODUCTS:
      state = [...action.products]
      return state
    default:
      return state
  }
}

export default products_reducer