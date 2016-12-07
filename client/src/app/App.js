import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect } from 'redux-async-connect';

//
import getRoutes from '../config/routes';
import createStore from '../common/helpers/configureStore';
import ApiClient from '../common/helpers/apiClient';


const client = new ApiClient();
const store = createStore(browserHistory, client, window.__data);
const history = syncHistoryWithStore(browserHistory, store);

// Socket connection
const ws = new WebSocket('ws://localhost:4000');
ws.onmessage = function (event) {
	console.log(event);
  // updateStats(JSON.parse(event.data));
};
ws.onopen = function() {
	console.error("OPENED");
};

// ws.on('build', (build) => {
// 	console.error("Received build");

// 	store.dispatch({
// 		type: '@SOCKET/BUILD',
// 		build,
// 	})
// })
// export default function (store) {
//   const socket = io.connect(`localhost:4000`);
 
//   socket.on('message', message => {
//     store.dispatch(actions.addResponse(message));
//   });
// }

const component = (
  <Router history={history} render={
  	(props) => <ReduxAsyncConnect {...props} helpers={{client}} filter={item => !item.deferred} />
	}>
    {getRoutes(store)}
  </Router>
);

export const App = () => (
  <Provider store={store} key="provider">
    {component}
  </Provider>
);

export default App;
