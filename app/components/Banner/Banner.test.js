import React from 'react'
import expect from 'expect'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import Banner from './Banner'

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
	return shallow(<Banner store={store} />);
}

describe('Banner screen', () => {

	it('should render', () => {
		const wrapper = setup();
		expect(wrapper).toExist();
	})

	it('should display title, logo and text', () => {
		const wrapper = setup();
		expect(wrapper.find('.title').length).toBe(1);
		expect(wrapper.find('.text').length).toBe(1);
		expect(wrapper.find('img').length).toBe(1);
	})
})