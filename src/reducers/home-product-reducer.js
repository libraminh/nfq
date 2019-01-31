import * as actionTypes from '../actions/types'

const initialHomeProduct = []

const home_products_reducer = (state = initialHomeProduct, action) => {
  switch(action.type) {
    case actionTypes.INIT_HOME_PRODUCT:
      const products = JSON.parse(localStorage.getItem("home_products"))
      state = products
      return state
    case actionTypes.ADD_PRODUCT:
      const isProduct = JSON.parse(localStorage.getItem("home_products"))
      if(isProduct === null) {
        state = [action.product]
        localStorage.setItem("home_products", JSON.stringify(state))
      } else {
        const productsItem = JSON.parse(localStorage.getItem("home_products"))
        productsItem.push(action.product)
        state = productsItem
        localStorage.setItem("home_products", JSON.stringify(state))
      }
      return state
    case actionTypes.ADD_FAVORITE:
      const favorite = action.favorite
      state = [...state.map(item => item.nasaId === action.id ? {...item, favorite} : item)]
      localStorage.setItem("home_products", JSON.stringify(state))
      return state
    case actionTypes.EDIT_PRODUCT:
      const newProduct = action.product
      state = [...state.map(item => item.nasaId === newProduct.nasaId ? {...item, ...newProduct} : item)]
      localStorage.setItem("home_products", JSON.stringify(state))
      return state
    case actionTypes.DELETE_PRODUCT:
      state = [...state.filter(item => item.id !== action.id)]
      localStorage.setItem("home_products", JSON.stringify(state))
      return state
    default:
      return state
  }
}

export default home_products_reducer