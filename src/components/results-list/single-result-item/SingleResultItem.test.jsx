import React from 'react';
import { mount, shallow } from 'enzyme';
import { Link, Divider } from '@mui/material';
import SingleResultItem from './SingleResultItem';
import { resultsMock } from '../../../mocks';

describe('Button [Component]', () => {
  let wrapper;
  const { title, overview, url, displayUrl } = resultsMock.items[0];

  beforeEach(() => {
    wrapper = mount(
      <SingleResultItem title={title} overview={overview} url={url} displayUrl={displayUrl} />
    );
  });

  it('should render', () => {
    expect(wrapper).not.toBe(null);
    expect(wrapper).not.toBe(undefined);
  });

  it('should have the next props: title, overview, url, displayUrl ', () => {
    expect(wrapper.props().title).toBeTruthy();
    expect(wrapper.props().overview).toBeTruthy();
    expect(wrapper.props().url).toBeTruthy();
    expect(wrapper.props().displayUrl).toBeTruthy();
  });

  it('should have two Links and a divider', () => {
    expect(wrapper.find(Link).length).toEqual(2);
    expect(wrapper.find(Divider).length).toEqual(1);
  });

  it('should have a title and an overview', () => {
    expect(wrapper.text().includes(title)).toBe(true);
    expect(wrapper.text().includes(overview)).toBe(true);
  });
});
