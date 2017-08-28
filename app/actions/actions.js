import * as ActionTypes from '../constants/ActionTypes'
import data from '../assets/data.js'

export function addListing(listing){
	return {
		type: ActionTypes.ADD_LISTING,
		payload: listing
	}
}

export function removeListing(){
	return {
		type: ActionTypes.REMOVE_LISTING
	}
}

export function fetchUrl(){

	const getId = function(url){
		// get matches for 2 types of url: ...listing/269058820 and anchor_listing_id=467380344
		const expr = url.match(/\listing\/([0-9])\w+|listing_id=([0-9])\w+/g );
		// filter out the id number
		return expr ? expr[0].match(/([0-9])\w+/g) : null
	}
	// load listing from Etsy's api
	const fetchListing = function(id){
		return new Promise((resolve, reject) => {
			resolve(data);
		})
	}
	const getUrl = function(){
		return new Promise(resolve => {
			chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, tabs => {
				return tabs[0].url;
			})
		})
	}

	return dispatch => {
		// get url of the current Chrome tab
		getUrl().then(url => {
			const listingId = getId(url)
			// if the url contains listing id, fetch it
			if(listingId){
				// show loading spinner
				dispatch({
					type: ActionTypes.SET_LOADING,
					value: true
				})
	
				fetchListing(listingId)
					.then((data)=> {
						dispatch({
							type: ActionTypes.SET_LOADING,
							value: false
						})
						dispatch({
							type: ActionTypes.ADD_LISTING,
							data
						})
					})
			}
		});
	}
}