import { createStore, applyMiddleware } from 'redux';
// import { createLogger } from 'redux-logger';
import loggingMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import reducer from './reducer';

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware, loggingMiddleware)
);

export default store;
