import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import logReducer from './login'

let reducers = combineReducers({ logReducer });

const store = () => {
  return createStore(reducers, composeWithDevTools(applyMiddleware()));
};

export default store();