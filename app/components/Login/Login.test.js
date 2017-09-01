import React from 'react'
import expect from 'expect'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import Login from './Login'

const setup = propOverrides => {
	const store = {
		account: {
			token: null,
			shopName: null,
		},
		listing: {},
		isRemoved: false,
		isLoading: false,
		shopifyId: null
	}
	const props = {
		actions: {
			logIn: sinon.spy(() => true)
		}
	}
	const wrapper = shallow(<Login store={store} props={{props}} />);
	const mounted  = mount(<Login store={store} props={{props}} />);
	return { wrapper, mounted, store, props }
}

describe('Login screen', () => {

	it('should render', () => {
		const {wrapper} = setup();
		expect(wrapper).toExist();
	})
	
  it('should show navbar, banner and form', () => {
		const {wrapper} = setup();
    expect(wrapper.find('Navbar').length).toBe(1);
    expect(wrapper.find('Banner').length).toBe(1);
    expect(wrapper.find('form').length).toBe(1);
	})
	
	it('should update shop url when shop name is inserted', () => {
		const {mounted} = setup();
		const input = mounted.find('input');
		input.node.value = 'shop_name';
		input.simulate('change', input);
		expect(mounted.state().shopName).toBe('shop_name');
	})

	it('should highlight the input with red when the empty form submited', () => {
		const {wrapper} = setup();
		wrapper.find('.button').simulate('click', {
			preventDefault: () => {}
		});
		expect(wrapper.state().error).toBe(true);
		expect(wrapper.find('input').hasClass('error')).toBe(true);
	})

	it('should call the logIn action creator with the shop name', () => {
		const {wrapper, props} = setup();
		wrapper.setState({shopName: 'shop_name'});
		wrapper.setProps(props);
		wrapper.find('.button').simulate('click', {
			preventDefault: () => {}
		});
		expect(props.actions.logIn.calledWith('shop_name')).toBe(true);
	})
})