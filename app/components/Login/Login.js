import React, { Component } from 'react'
import './Login.scss'
import Banner from '../Banner/Banner'
import Navbar from '../Navbar/Navbar'

class Login extends Component {

	constructor(){
		super();
		this.state = {
			error: false,
			shopName: ''
		}
	}

	logIn(e){
		e.preventDefault();
		if(this.state.shopName.match(/^\w+$/))
			this.props.actions.logIn(this.state.shopName);
		else this.setState({error: true});
	}
	handleChange(e) {
    this.setState({shopName: e.target.value, error: false});
	}
	getError(){
		return this.state.error ? 'Incorrect store name' : this.props.data.error;
	}

	render () {
		return (
			<div className="Login col-start-center">
				<Navbar error={this.getError()}>Welcome</Navbar>
				<Banner 
					title="Log in to your Shopify store"
					text={this.state.shopName+".myshopify.com"} />

				<form onSubmit={(e) => this.logIn(e)}>
					<input 
						ref={input => { this.textInput = input; }} 
						onChange={e => this.handleChange(e)}
						spellCheck="false" autoFocus={true} placeholder={'Shop name'}
						className={this.state.error ? 'error' : ''} />
					<div className="button" onClick={e => this.logIn(e)}>Log in</div>
				</form>
			</div>
		)
	}
}

export default Login