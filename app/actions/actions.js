import * as ActionTypes from '../constants/ActionTypes'
import { TOKEN_KEY, API_KEY, ETSY_URL } from '../constants/constants'
import axios from 'axios'
import api from '../assets/data.js'
import productBuilder from './productBuilder'

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

export function logIn(){
	// this is a fake login
	const processLogin = function(){
		return new Promise(resolve => {
			const token = 'fake token';
			chrome.storage.local.set({[TOKEN_KEY]: token});
			setTimeout(() => resolve(token), 700);
		})
	}

	return dispatch => {
		dispatch({
			type: ActionTypes.SET_LOADING,
			value: true
		})
		processLogin().then(token => {
			dispatch({
				type: ActionTypes.SET_LOADING,
				value: false
			});
			dispatch({
				type: ActionTypes.LOGIN,
				token
			})
		})
	}
}

export function logOut(){

	// Erase token from the local storage
	chrome.storage.local.set({[TOKEN_KEY]: null});

	return dispatch => {
		dispatch({
			type: ActionTypes.SET_LOADING,
			value: true
		})
		setTimeout(() => {
			dispatch({
				type: ActionTypes.SET_LOADING,
				value: false
			})
			dispatch({
				type: ActionTypes.LOGOUT
			})
		}, 300)
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
		return axios.get(ETSY_URL+id, {
			params: {
				api_key: API_KEY,
				fields: 'title,url,description,price,tags,category_path,currency_code',
				limit: '100s',
				includes: 'User,MainImage,Shop,Variations'
			}
		})
	}
	const getUrl = function(){
		return new Promise(resolve => {
			chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, tabs => {
				resolve(tabs[0].url);
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
					.then((response)=> {
						dispatch({
							type: ActionTypes.SET_LOADING,
							value: false
						})
						dispatch({
							type: ActionTypes.ADD_LISTING,
							listing: response.data.results[0]
						})
					})
			}
		});
	}
}

export function init(){
	return dispatch => {
		// Load user token from Chrome local storage
		chrome.storage.local.get(TOKEN_KEY, result => dispatch({
			type: ActionTypes.LOGIN,
			token: result[TOKEN_KEY]
		}));
	}
}

function uploadListing(){
	axios.defaults.headers.common['X-Shopify-Access-Token'] = "31147975fb9828f4b43a6ab8939dabec";
	axios.post(
		'https://alexsuperstore.myshopify.com/admin/products.json',
		productBuilder(api.results[0])
	).then((res => console.log(res))).catch(err => console.log(err));
}