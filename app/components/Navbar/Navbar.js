import React, { Component } from 'react'
import './Navbar.scss'
import logo from '../../assets/images/logo.png'

export default class Navbar extends Component{

	getError(){
		return this.props.error ? <div className="message">{this.props.error}</div> : null;
	}
	getLogo(){
		return this.props.error ? null : <img className="logo" src={logo} />;
	}

	render(){
		return (
			<div className={`Navbar col-center-start ${this.props.error ? 'error' : ''}`}>
				<div className="row-start-center" style={{width: '100%'}}>
					{this.getLogo}
					<div>{this.props.error ? 'Error' : this.props.children}</div>
					<div className="flex-1" />
					<div className="close" onClick={() => close()}>&times;</div>
				</div>
				{this.getError()}
			</div>
		)
	}
}