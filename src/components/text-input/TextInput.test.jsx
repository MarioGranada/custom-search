import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import { Box, TextField } from '@mui/material';
import TextInput from './TextInput';

describe('Button [Component]', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<TextInput onChange={() => {}} placeholder="test placeholder" value="test" />);
  });

  it('should render', () => {
    expect(wrapper).not.toBe(null);
    expect(wrapper).not.toBe(undefined);
  });

  it('should have the next props: onChange, placeholder, value', () => {
    expect(wrapper.props().onChange).toBeTruthy();
    expect(wrapper.props().placeholder).toBeTruthy();
    expect(wrapper.props().value).toBeTruthy();
  });

  it('should have a Box and a TextInput', () => {
    expect(wrapper.find(Box).length).toEqual(1);
    expect(wrapper.find(TextField).length).toEqual(1);
  });

  it('should execute onClick when called', () => {
    const spyOnChange = sinon.spy();
    wrapper = shallow(<TextInput onChange={spyOnChange} />);
    wrapper.find(TextField).simulate('change');
    expect(spyOnChange.calledOnce).toBe(true);
  });
});
