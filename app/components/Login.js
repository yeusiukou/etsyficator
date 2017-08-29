import React, { Component } from 'react'
import './Login.scss'
import Banner from './Banner'
import Navbar from './Navbar'

class Login extends Component {

	constructor(){
		super();
		this.state = {
			error: false
		}
	}

	logIn(e){
		e.preventDefault();
		if(this.textInput.value)
			this.props.actions.logIn(this.textInput.value.replace('shopify.com', ''));
		else this.setState({error: true})
	}

	render () {
		return (
			<div className="Login col-start-center">
				<Navbar>Welcome</Navbar>
				<Banner title="Log in to your Shopify store" />

				<form onSubmit={(e) => this.logIn(e)}>
					<input 
						ref={(input) => { this.textInput = input; }} 
						spellCheck="false" autoFocus={true} placeholder={'myshop.shopify.com'}
						className={this.state.error ? 'error' : ''} />
					<div className="button" onClick={(e) => this.logIn(e)}>Log in</div>
				</form>
			</div>
		)
	}
}

export default Login