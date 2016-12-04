import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import createMiddleware from '../middlewares/clientMiddleware';
import { routerMiddleware } from 'react-router-redux';
import reducers from '../reducers';

export default function createStore(history, client, data) {
  // Sync dispatched route actions to the history
  const reduxRouterMiddleware = routerMiddleware(history);

  const middleware = [createMiddleware(client), reduxRouterMiddleware];

  const finalCreateStore = applyMiddleware(...middleware)(_createStore);
  const store = finalCreateStore(reducers, data);

  return store;
}