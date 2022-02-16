import React from 'react';
import { mount, shallow } from 'enzyme';
import ResutlsList from './ResultsList';
import SingleResultItem from './single-result-item/SingleResultItem';
import { resultsMock } from '../../mocks';

describe('ResultsList [Component]', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <ResutlsList items={resultsMock.items} totalResults={resultsMock.items.length} />
    );
  });

  it('should render', () => {
    expect(wrapper).not.toBe(null);
    expect(wrapper).not.toBe(undefined);
  });

  it('should have the next props: items, totalResults', () => {
    expect(wrapper.props().items).toBeTruthy();
    expect(wrapper.props().totalResults).toBeGreaterThanOrEqual(0);
  });

  it('should have a total results label displaying the total results value', () => {
    expect(wrapper.text().includes('Total Results: ')).toBe(true);
    expect(wrapper.text().includes(resultsMock.items.length)).toBe(true);
  });

  it('should have a list of single result items', () => {
    expect(wrapper.find(SingleResultItem).length).toEqual(resultsMock.items.length);
  });
});
