import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import { Box } from '@mui/material';
import FormWrapper from './FormWrapper';

describe('Button [Component]', () => {
  let wrapper;
  const children = <div>this is a children test</div>;
  beforeEach(() => {
    wrapper = mount(<FormWrapper onKeyDown={() => {}}>{children}</FormWrapper>);
  });

  it('should render', () => {
    expect(wrapper).not.toBe(null);
    expect(wrapper).not.toBe(undefined);
  });

  it('should have the next props: disabled, children, onClick', () => {
    expect(wrapper.props().children).toBeTruthy();
  });

  it('should have a children as a React Node', () => {
    expect(wrapper.props().children).toEqual(children);
  });

  it('should execute onClick when called', () => {
    const spyOnClick = sinon.spy();
    wrapper = shallow(<FormWrapper onKeyDown={spyOnClick}>{children}</FormWrapper>);
    wrapper.find(Box).simulate('keyDown');
    expect(spyOnClick.calledOnce).toBe(true);
  });
});
