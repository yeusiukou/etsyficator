import React from 'react'
import expect from 'expect'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import Empty from './Empty'

const setup = propOverrides => {
	
	const store = {
		account: {
			token: null,
			shopName: null,
		},
		listing: {},
		isRemoved: false,
		isLoading: false,
		shopifyId: null,
		...propOverrides
	}
	const props = {
		actions: {
			logOut: sinon.spy(() => true)
		}
	}
	const wrapper = mount(<Empty store={store} />);
	return {wrapper, props};
}

describe('Empty screen', () => {
	it('should render', () => {
		const {wrapper} = setup();
		expect(wrapper).toExist();
	})

	it('should render Navbar, Banner, hint and a link to log out', () => {
		const {wrapper} = setup();
		expect(wrapper.find('Navbar').length).toBe(1);
		expect(wrapper.find('Banner').length).toBe(1);
		expect(wrapper.find('.hint').length).toBe(1);
		expect(wrapper.find('.logOut').length).toBe(1);
	})

	it('should log out when the button is clicked', () => {
		const {wrapper, props} = setup();
		wrapper.setProps(props)
		wrapper.find('.logOut').simulate('click', { preventDefault: () => true });
		expect(props.actions.logOut.called).toBeTruthy();
	});
})