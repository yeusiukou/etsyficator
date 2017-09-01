import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Banner.scss'
import Logo from '../../assets/images/logo-grey.png'

class Banner extends Component {
	render () {
		return (
			<div className="Banner col-center-center">
				<div className="title">{this.props.title}</div>
				<img src={Logo} />
				<div className="text">{this.props.text}</div>
			</div>
		)
	}
}
Banner.propTypes = {
	title: PropTypes.string
};
export default Banner