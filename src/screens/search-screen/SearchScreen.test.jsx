import React, { Component } from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { waitFor } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import { act } from 'react-dom/test-utils';
import { Box, Container, LinearProgress } from '@mui/material';

import { Button, Dropdown, FormWrapper, ResultsList, TextInput, TopBar } from '../../components';

import actions from '../../store/actions';
import SearchScreen from './SearchScreen';
import utils from '../../utils';
import English from '../../lang/en.json';

const mockStore = configureStore();

const store = mockStore({
  form: {
    selectedEngine: '',
    inputQuery: '',
    isLoading: false
  },
  results: {
    query: '',
    currentEngine: '',
    items: [],
    totalResults: 0
  }
});

const flushPromises = () => new Promise((resolve, reject) => setTimeout(resolve, 0));

describe('Search [Screen]', () => {
  let wrapper;
  const children = <div>this is a children test</div>;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <IntlProvider locale="en" messages={English}>
          <SearchScreen>{children}</SearchScreen>
        </IntlProvider>
      </Provider>
    );
  });

  it('should render', () => {
    expect(wrapper).not.toBe(null);
    expect(wrapper).not.toBe(undefined);
  });

  it('should have the next wrapper components in the very beginning: Box, Container', () => {
    expect(wrapper.find(Box).length).toEqual(6);
    expect(wrapper.find(Container).length).toEqual(1);
  });

  it('should have the next custom components: Button, Dropdown, FormWrapper, ResultsList, TextInput, TopBar', () => {
    expect(wrapper.find(Button).length).toEqual(1);
    expect(wrapper.find(Dropdown).length).toEqual(1);

    expect(wrapper.find(FormWrapper).length).toEqual(1);
    expect(wrapper.find(ResultsList).length).toEqual(1);

    expect(wrapper.find(TextInput).length).toEqual(1);
    expect(wrapper.find(TopBar).length).toEqual(1);
  });

  it('should call onSelect when selecting a value from dropdown', () => {
    act(() => {
      wrapper
        .find(Dropdown)
        .props()
        .onChange({ target: { value: 'bing' } });
    });
    wrapper.update();

    expect(wrapper.find(Dropdown).props().selected).toEqual('bing');
  });

  it('should call onTextChange when typing a query', () => {
    act(() => {
      wrapper
        .find(TextInput)
        .props()
        .onChange({ target: { value: 'test' } });
    });
    wrapper.update();

    expect(wrapper.find(TextInput).props().value).toEqual('test');
  });

  it('should call onSubmit when Button clicked', () => {
    sinon.spy(actions, 'clearResults');

    act(() => {
      wrapper
        .find(TextInput)
        .props()
        .onChange({ target: { value: 'test' } });
    });
    wrapper.update();

    act(() => {
      wrapper.find(Button).props().onClick();
    });
    wrapper.update();

    expect(actions.clearResults.calledOnce).toBe(true);
    actions.clearResults.restore();
  });

  it("should call onSubmit when hitting 'Enter' ", () => {
    sinon.spy(actions, 'clearResults');
    act(() => {
      wrapper.find(FormWrapper).props().onKeyDown({ key: 'Enter' });
    });
    wrapper.update();

    expect(actions.clearResults.calledOnce).toBe(true);
    actions.clearResults.restore();
  });

  it("should not call onSubmit when hitting other key different than 'Enter' ", () => {
    sinon.spy(actions, 'clearResults');
    act(() => {
      wrapper.find(FormWrapper).props().onKeyDown({ key: 'a' });
    });
    wrapper.update();

    expect(actions.clearResults.calledOnce).toBe(false);
    actions.clearResults.restore();
  });

  it('should call onFetchResults when onSubmit is clicked', () => {
    window.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([])
      })
    );

    sinon.spy(utils, 'prepareSearch');

    act(() => {
      wrapper
        .find(TextInput)
        .props()
        .onChange({ target: { value: 'custom search' } });
    });
    wrapper.update();

    act(() => {
      wrapper.find(Button).props().onClick();
    });
    wrapper.update();

    expect(utils.prepareSearch.calledOnce).toBe(true);
    expect(window.fetch).toHaveBeenCalledTimes(1);
    utils.prepareSearch.restore();
  });

  it('should call prepareDataBeforeStore when fetch results', async () => {
    window.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([])
      })
    );
    sinon.spy(utils, 'prepareDataBeforeStore');
    sinon.spy(actions, 'mergeResults');

    act(() => {
      wrapper
        .find(TextInput)
        .props()
        .onChange({ target: { value: 'custom search' } });
    });
    wrapper.update();

    act(() => {
      wrapper.find(Button).props().onClick();
    });
    wrapper.update();
    await flushPromises();

    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(utils.prepareDataBeforeStore.calledOnce).toBe(true);
    expect(actions.mergeResults.calledOnce).toBe(true);
  });

  it('should display a console log error when fetch is rejected', async () => {
    window.fetch = jest.fn(() => Promise.reject({ message: 'error' }));
    sinon.spy(actions, 'setIsLoading');

    act(() => {
      wrapper
        .find(TextInput)
        .props()
        .onChange({ target: { value: 'custom search' } });
    });
    wrapper.update();

    act(() => {
      wrapper.find(Button).props().onClick();
    });
    wrapper.update();
    await flushPromises();

    expect(actions.setIsLoading.called).toBe(true);
    actions.setIsLoading.restore();
  });

  it('should display a loading bar while loading data', () => {
    const store = mockStore({
      form: {
        isLoading: true
      },
      results: {
        items: []
      }
    });
    wrapper = mount(
      <Provider store={store}>
        <IntlProvider locale="en" messages={English}>
          <SearchScreen>{children}</SearchScreen>
        </IntlProvider>
      </Provider>
    );

    expect(wrapper.find(LinearProgress).length).toEqual(1);
  });
});
