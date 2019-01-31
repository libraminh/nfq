import * as actionTypes from '../actions/types'

const init_global = {
  isModal: false
}

const global_reducer = (state = init_global, action) => {
  switch(action.type) {
    case actionTypes.OPEN_MODAL:
      state = {isModal: true}
      return state
    case actionTypes.CLOSE_MODAL:
      state = {isModal: false}
      return state
    default:
      return state
  }
}

export default global_reducer