import React from 'react'
import expect from 'expect'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import Login from './Login'

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
		logIn: () => true
	}
}

describe('Login screen', () => {
	
  it('should show navbar, banner and form', () => {
		const wrapper = shallow(<Login store={store} props={{props}}/>);
    expect(wrapper.find('Navbar').length).toEqual(1);
    expect(wrapper.find('Banner').length).toEqual(1);
    expect(wrapper.find('form').length).toEqual(1);
	})
	
	it('should update shop url when shop name is inserted', () => {
		const wrapper = mount(<Login store={store} props={{props}}/>);
		const input = wrapper.find('input');
		input.node.value = 'shop_name';
		input.simulate('change', input);
		expect(wrapper.state().shopName).toBe('shop_name');
	})

	it('should highlight the input with red when the empty form submited', () => {
		const wrapper = mount(<Login store={store} props={{props}}/>);
		wrapper.find('.button').first().simulate('click');
		expect(wrapper.state().error).toBe(true);
		expect(wrapper.find('input').hasClass('error')).toBe(true);
	})

	it('should call the logIn action creator with the shop name', () => {
		const props = {
			actions: {
				logIn: sinon.spy(() => true)
			}
		}
		const wrapper = shallow(<Login store={store}/>);
		wrapper.setState({shopName: 'shop_name'});
		wrapper.setProps(props);
		wrapper.find('.button').simulate('click', {
			preventDefault: () => {}
		});
		expect(props.actions.logIn.calledWith('shop_name')).toBe(true);
	})
})