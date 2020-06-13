import React from 'react';
import {shallow} from 'enzyme';
import Signin from '../components/Signin/Signin';

describe('Signin Component', () => {
    it('should render without throwing an error', () => {
        expect(shallow(<Signin />).find('form.signin').exists()).toBe(true)
    })

    it('renders a email input', () => {
        expect(shallow(<Signin />).find('#email').length).toEqual(1)
    })

    it('renders a password input', () => {
        expect(shallow(<Signin />).find('#password').length).toEqual(1)
    })
})

describe('Email input', () => {
    it('should respond to change event and change the state of the Login Component', () =>{
        const wrapper = shallow(<Login />);
        wrapper.find('#email').simulate('change', {target: {name: 'email', value: 'abc@gmail.com'}});
        expect(wrapper.state('email')).toEqual('abc@gmail.com');
    })
})

describe('Password input', () => {
    it('should respond to change event and change the state of the Login Component', () =>{
        const wrapper = shallow(<Login />);
        wrapper.find('#password').simulate('change', {target: {name: 'password', value: 'abc'}});
        expect(wrapper.state('password')).toEqual('abc');
    })
})