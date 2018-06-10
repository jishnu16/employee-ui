/* eslint-disable no-undef */
import React from 'react';
import {shallow} from 'enzyme';

import TextInput from './SelectInput';

describe('SelectInput', () => {
  function setUp(error) {
    const props = {
      name: "gender",
      lavel: "Gender",
      onChange: () => {},
      value: ['Male'],
      defaultOption: "Select Gender",
      options: ['Male', 'female'],
      errors: {error}
    };
    return shallow(<TextInput {...props}/>);
  }

  it('should input have multi fields', () => {
    let wrapper = setUp();
    expect(wrapper.find('select').props().name).toEqual("gender");
    expect(wrapper.find('select').props().className).toEqual("form-control");
  });
});
