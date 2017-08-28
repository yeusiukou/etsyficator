import * as ActionTypes from '../constants/ActionTypes'

const initialState = {
	token: null,
	listing_id: null,
	listing: {},
	removed: false,
	isLoading: false
}

export default function dataReducer (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ADD_LISTING:
      return {
        ...state,
        listing: action.data
      }
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.value
      }
    default:
      return state
  }
}