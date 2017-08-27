import React, { Component } from 'react'
import logo from '../assets/images/logo.png'

export default class Navbar extends Component{
	render(){
		return (
			<div className="Navbar row-start-center">
				<img className="logo" src={logo} />
				<div>Spockets</div>
				<div className="flex-1" />
				<div className="close">&times;</div>
			</div>
		)
	}
}