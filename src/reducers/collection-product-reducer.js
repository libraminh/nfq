import * as actionTypes from '../actions/types'

const initialCollectionProduct = {}

const collection_product_reducer = (state = initialCollectionProduct, action) => {
  switch(action.type) {
    case actionTypes.ADD_TO_COLLECTION:
      state = action.product
      return state
    default:
      return state
  }
}

export default collection_product_reducer