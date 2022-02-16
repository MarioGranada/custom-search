import * as React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import { MenuItem, Select } from '@mui/material';

import Dropdown from './Dropdown';

describe('Dropdown [Component]', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Dropdown
        id="test-id"
        groupName="test-group"
        options={[
          { label: 'test 1 ', value: 'test-1' },
          { label: 'test 2', value: 'test-2' },
          { label: 'test 3', value: 'test-3' }
        ]}
        selected="test-1"
        groupLabel="test-group"
        onChange={(event) => {
          console.log('button clicked');
        }}
      />
    );
  });

  it('should render', () => {
    expect(wrapper).not.toBe(null);
    expect(wrapper).not.toBe(undefined);
  });

  it('should have the next props: id, groupName, options, groupLabel, onChange, selected', () => {
    expect(wrapper.props().id).toBeTruthy();
    expect(wrapper.props().groupName).toBeTruthy();
    expect(wrapper.props().options).toBeTruthy();
    expect(wrapper.props().groupLabel).toBeTruthy();
    expect(wrapper.props().onChange).toBeTruthy();
    expect(wrapper.props().selected).toBeTruthy();
  });

  it('should have a list of MenuItem elements', () => {
    wrapper = shallow(
      <Dropdown
        id="test-id"
        groupName="test-group"
        options={[
          { label: 'test 1 ', value: 'test-1' },
          { label: 'test 2', value: 'test-2' },
          { label: 'test 3', value: 'test-3' }
        ]}
        selected="test-1"
        groupLabel="test-group"
        onChange={(event) => {
          console.log('button clicked');
        }}
      />
    );
    expect(wrapper.find(MenuItem).length).toEqual(3);
  });

  it('should execute onClick when called', () => {
    const spyOnClick = sinon.spy();
    wrapper = shallow(
      <Dropdown
        id="test-id"
        groupName="test-group"
        options={[
          { label: 'test 1 ', value: 'test-1' },
          { label: 'test 2', value: 'test-2' },
          { label: 'test 3', value: 'test-3' }
        ]}
        selected="test-1"
        groupLabel="test-group"
        onChange={spyOnClick}
      />
    );
    wrapper.find(Select).simulate('change');
    expect(spyOnClick.calledOnce).toBe(true);
  });
});
