import { combineReducers, createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import destinations from './destinations';

const reducer = combineReducers({ destinations });
const middleware = applyMiddleware(createLogger({ collapsed: true }));
export default createStore(reducer, middleware);

export * from './destinations';
