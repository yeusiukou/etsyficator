import * as ActionTypes from '../constants/ActionTypes'
import { TOKEN_KEY } from '../constants/constants'

const initialState = {
	token: null,
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

    case ActionTypes.REMOVE_LISTING:
      return {
        ...state,
        listing: {},
        isRemoved: true
      }

    case ActionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.value
      }

    case ActionTypes.LOGIN:
      return {
        ...state,
        token: action.token
      }

    case ActionTypes.LOGOUT:
      return {
        ...state,
        token: null
      }

    default:
      return state
  }
}