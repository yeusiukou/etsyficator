import React, { Component } from 'react'
import Banner from './Banner'
import Navbar from '../components/Navbar'

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
	position: 'relative'
}

class Removed extends Component {
	render () {
		return (
			<div className="col-start-center" style={mainStyle}>
				<Navbar>Spocket</Navbar>
				<div style={barStyle}/>
				<Banner title="The item has been removed" />
				<div className="icon" style={iconStyle}>&times;</div>
			</div>
		)
	}
}

export default Removed