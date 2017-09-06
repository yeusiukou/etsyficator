import React, { Component } from 'react'
import Banner from '../Banner/Banner'
import Navbar from '../Navbar/Navbar'

class Empty extends Component {

	logOut(e){
		e.preventDefault();
		this.props.actions.logOut();
	}

	getText(){
		return (
			<div className="hint">
				Now go to<a target="_blank" href="https://etsy.com">Etsy.com</a> 
				and start dropshipping with one click!
			</div>
		)
	}

	render () {
		return (
			<div className="col-start-center" style={{height: "100%"}}>
				<Navbar>Etsyficator</Navbar>
				<Banner 
					title="Thank you for using Etsyficator!"
					text={this.getText()} />
				<div className="flex-1" />
				<a className="logOut" href="#" onClick={e => this.logOut(e)}>Log out</a>
			</div>
		)
	}
}

export default Empty