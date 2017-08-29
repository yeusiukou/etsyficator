import * as ActionTypes from '../constants/ActionTypes'
import { ACCOUNT_KEY, API_KEY, ETSY_URL, getDeleteUrl, getPostUrl, AUTH_URL } from '../constants/constants'
import axios from 'axios'
import api from '../assets/data.js'
import productBuilder from './productBuilder'

export function addListing(listing){
	return {
		type: ActionTypes.ADD_LISTING,
		payload: listing
	}
}

export function removeListing(id, shopName){
	return dispatch => {
		dispatch({
			type: ActionTypes.SET_LOADING,
			value: true
		})
		axios.delete(getDeleteUrl(shopName, id)).
			then(() => {
				dispatch({
					type: ActionTypes.SET_LOADING,
					value: false
				})
				dispatch({
					type: ActionTypes.REMOVE_LISTING
				})
			})
	}
}

export function logIn(shopName){
	return dispatch => {
		dispatch({
			type: ActionTypes.SET_LOADING,
			value: true
		})
		chrome.identity.launchWebAuthFlow({ url: AUTH_URL+'auth/'+shopName,'interactive':true }, (redirect_url)=> {
			dispatch({
				type: ActionTypes.SET_LOADING,
				value: false
			})
			if(!redirect_url) //if shop doesn't exist don't proceed
				// TODO: add UI notification
				return;
			const token = redirect_url.split('=')[1];
			auth(dispatch, {token, shopName});
		});
	}
}

export function logOut(){

	// Erase token from the local storage
	chrome.storage.local.set({[ACCOUNT_KEY]: null});

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

function fetchUrl(dispatch, shopName){

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
				includes: 'User,Images,MainImage,Shop,Variations,Inventory'
			}
		})
	}
	const getUrl = function(dispatch){
		return new Promise(resolve => {
			chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, tabs => {
				resolve(tabs[0].url);
			})
		})
	}

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
					
					postListing(dispatch, response.data.results[0], shopName)
						.then(res => {
							dispatch({
								type: ActionTypes.SET_SHOPIFY_ID,
								id: res.data.product.id
							})
						})
						.catch(err => {
							// log out if auth is incorrect or token has expired
							if(!err.response || err.response.status === 401)
								logOut()(dispatch);
						})
				})
			}
		});
}

export function init(){
	return dispatch => {
		// Load auth info from Chrome local storage
		chrome.storage.local.get(ACCOUNT_KEY, result => {
			// if there is account information
			if(result[ACCOUNT_KEY])
				auth(dispatch, result[ACCOUNT_KEY]);
		});
	}
}

function postListing(dispatch, data, shopName){
	return axios.post(getPostUrl(shopName), productBuilder(data))
}

function auth(dispatch, account){
	chrome.storage.local.set({[ACCOUNT_KEY]: account});
	axios.defaults.headers.common['X-Shopify-Access-Token'] = account.token;
	dispatch({
		type: ActionTypes.LOGIN,
		account
	});
	fetchUrl(dispatch, account.shopName);
}