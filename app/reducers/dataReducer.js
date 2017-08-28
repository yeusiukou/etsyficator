import * as ActionTypes from '../constants/ActionTypes'

const initialState = {
	token: 'fake token',
	listing_id: null,
	listing: {},
	isRemoved: false,
	isLoading: false
}

export default function dataReducer (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ADD_LISTING:
      return {
        ...state,
        listing: action.listing
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