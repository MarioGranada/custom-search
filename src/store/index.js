import { createStore, combineReducers } from 'redux';
import { form, results } from './reducers';

const rootReducer = combineReducers({ form, results });

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
