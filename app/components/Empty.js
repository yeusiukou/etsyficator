import React, { Component } from 'react'
import Banner from './Banner'
import Navbar from '../components/Navbar.js'

class Empty extends Component {
	render () {
		return (
			<div className="col-start-center">
				<Navbar>Spocket</Navbar>
				<Banner 
					title="Thank you for using Spocket!"
					text={getText()} />

				<a href="#" style={{marginTop: "40px"}}>Log out</a>
			</div>
		)
	}
}

function getText(){
	return (
		<div>
			Now go to<a target="_blank" href="https://etsy.com">Etsy.com</a> 
			and start dropshipping with one click!
		</div>
	)
}

export default Empty