import React, { Component } from 'react'
import Banner from '../Banner/Banner'
import Navbar from '../Navbar/Navbar'
import PropTypes from 'prop-types'

class Continue extends Component {

	logIn(e){
		e.preventDefault();
		this.props.actions.logIn(this.props.data.account.shopName);
	}

	logOut(e){
		e.preventDefault();
		this.props.actions.logOut();
	}

	render () {
		return (
			<div className="Continue col-start-center">
				<Navbar>Welcome</Navbar>
				<Banner 
					title="Log in to your Shopify store"
					text={this.props.data.account.shopName+".myshopify.com"} />
				<div className="button" onClick={e => this.logIn(e)}>Continue</div>
				<div className="flex-1" />
				<a className="logOut" href="#" onClick={e => this.logOut(e)}>Log out</a>
			</div>
		)
	}
}

Continue.PropTypes = {
	shopName: PropTypes.string
}

export default Continue