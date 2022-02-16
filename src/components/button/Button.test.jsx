import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import { Box, Button } from '@mui/material';
import SearchButton from './Button';

describe('Button [Component]', () => {
  let wrapper;
  const children = <div>this is a children test</div>;
  beforeEach(() => {
    wrapper = mount(
      <SearchButton
        onClick={() => {
          console.log('button clicked');
        }}>
        {children}
      </SearchButton>
    );
  });

  it('should render', () => {
    expect(wrapper).not.toBe(null);
    expect(wrapper).not.toBe(undefined);
  });

  it('should have the next props: disabled, children, onClick', () => {
    expect(wrapper.props().onClick).toBeTruthy();
    expect(wrapper.props().children).toBeTruthy();
    expect(wrapper.props().disabled).toBeFalsy();
  });

  it('should have a children as a React Node', () => {
    expect(wrapper.props().children).toEqual(children);
  });

  it('should execute onClick when called', () => {
    const spyOnClick = sinon.spy();
    wrapper = shallow(<SearchButton onClick={spyOnClick}>{children}</SearchButton>);
    wrapper.find(Button).simulate('click');
    expect(spyOnClick.calledOnce).toBe(true);
  });
});
