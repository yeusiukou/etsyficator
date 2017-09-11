import * as ActionTypes from '../constants/ActionTypes'
import { TOKEN_KEY } from '../constants/constants'

const initialState = {
  account: {
    token: null,
    shopName: null,
  },
	listing: {},
	isRemoved: false,
  isLoading: false,
  shopifyId: null,
  error: null
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
        isRemoved: true,
        shopifyId: null
      }

    case ActionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.value
      }

    case ActionTypes.LOGIN:
      return {
        ...state,
        account: action.account
      }

    case ActionTypes.LOGOUT:
      return {
        ...state,
        account: {}
      }

    case ActionTypes.SET_SHOPIFY_ID:
      return {
        ...state,
        shopifyId: action.id
      }

    case ActionTypes.ERROR:
      return {
        ...state,
        error: action.message
      }

    default:
      return state
  }
}