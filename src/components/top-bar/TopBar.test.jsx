import React from 'react';
import { mount } from 'enzyme';
import { Box } from '@mui/material';
import TopBar from './TopBar';

describe('Button [Component]', () => {
  let wrapper;
  const children = <div>this is a children test</div>;
  beforeEach(() => {
    wrapper = mount(<TopBar>{children}</TopBar>);
  });

  it('should render', () => {
    expect(wrapper).not.toBe(null);
    expect(wrapper).not.toBe(undefined);
  });

  it('should have the next props: children', () => {
    expect(wrapper.props().children).toBeTruthy();
    expect(wrapper.find(Box).length).toEqual(1);
  });

  it('should have a children as a React Node', () => {
    expect(wrapper.props().children).toEqual(children);
  });
});
