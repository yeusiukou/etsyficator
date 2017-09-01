import React, { Component } from 'react'
import './Loading.scss'

class Loading extends Component {
	render () {
		return (
			<div className="Loading row-center-center">
				<div className="spinner" />
			</div>
		)
	}
}

export default Loading