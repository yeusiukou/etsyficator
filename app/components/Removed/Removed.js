import React, { Component } from 'react'
import Banner from '../Banner/Banner'
import Navbar from '../Navbar/Navbar'

const iconStyle = {
	position: 'absolute',
	width: '40px',
	height: '40px',
	color: 'white',
	fontSize: '80px',
	top: '230px',
	left: '105px',
	pointerEvents: 'none'
}
const barStyle = {
	marginBottom: '30px'
}
const mainStyle = {
	position: 'relative',
	height: '100%'
}

class Removed extends Component {

	logOut(e){
		e.preventDefault();
		this.props.actions.logOut();
	}

	render () {
		return (
			<div className="col-start-center" style={mainStyle}>
				<Navbar>Etsyficator</Navbar>
				<div style={barStyle}/>
				<Banner title="The item has been removed" />
				<div className="icon" style={iconStyle}>&times;</div>
				<div className="flex-1" />
				<a href="#" onClick={e => this.logOut(e)}>Log out</a>
			</div>
		)
	}
}

export default Removed