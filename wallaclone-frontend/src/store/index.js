import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import thunk from 'redux-thunk';
import logger from 'redux-logger';

import * as reducers from './reducers';
import * as api from '../api';

export function configureStore(preloadedState, { history }) {
  const reducer = combineReducers({
    router: connectRouter(history),
    ...reducers,
  });
  const middlewares = [
    routerMiddleware(history),
    thunk.withExtraArgument({ history, api }),
    logger,
  ];
  const store = createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(...middlewares))
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
}
