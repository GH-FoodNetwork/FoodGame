import { combineReducers, createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import destinations from './destinations';
import availabilities from './availabilities';
import money from './money';
import { composeWithDevTools } from 'redux-devtools-extension';

const reducer = combineReducers({ destinations, availabilities, money });
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './destinations';
