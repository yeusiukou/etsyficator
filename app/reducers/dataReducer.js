import {ADD_LISTING, REMOVE_LISTING, LOGIN, LOGOUT} from '../constants/ActionTypes'

const initialState = {
	token: null,
	listing_id: null,
	listing: {},
	removed: false,
	isLoading: false
}

export default function dataReducer (state = initialState, action) {
  switch (action.type) {
    case ADD_LISTING:
      return {
        ...state,
        data: action.data
      }
    default:
      return state
  }
}