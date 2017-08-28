import React, { Component } from 'react'
import Banner from './Banner'
import Navbar from './Navbar'

class Login extends Component {

	logIn(){
		this.props.actions.logIn();
	}

	render () {
		return (
			<div className="col-start-center">
				<Navbar>Welcome</Navbar>
				<Banner 
					title="Thank you for using Spocket!"
					text="Please log in to your Spocket account" />
				<div className="button" onClick={() => this.logIn()}>Log in</div>
			</div>
		)
	}
}

export default Login