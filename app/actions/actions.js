import {ADD_LISTING, REMOVE_LISTING, LOGIN, LOGOUT} from '../constants/ActionTypes'

export function addListing(listing){
	return {
		type: ADD_LISTING,
		payload: listing
	}
}

export function removeListing(){
	return {
		type: REMOVE_LISTING
	}
}