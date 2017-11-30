import { combineReducers, createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import destinations from './destinations';
import availabilities from './availabilities';
import money from './money';
import customer from './customer';
import recipes from './recipes';
import platter from './platter';
import { composeWithDevTools } from 'redux-devtools-extension';

const reducer = combineReducers({
  destinations,
  availabilities,
  money,
  customer,
  recipes,
  platter,
});
const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger({ collapsed: true })));
const store = createStore(reducer, middleware);

export default store;
export * from './destinations';
export * from './availabilities';
export * from './money';
export * from './customer';
export * from './recipes';
export * from './platter';
