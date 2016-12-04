import React from 'react';
import {IndexRoute, Route} from 'react-router';
import { load as loadAuth } from '../login/LoginActions';

import { ProjectList } from '../projectlist';

export default (store) => {
  console.log((
    <Route path="/">
      { /* Home (main) route */ }
      <IndexRoute component={ProjectList}/>
      
    </Route>
  ));
  const requireLogin = (nextState, replace, cb) => {
    cb();
    // function checkAuth() {
    //   const { auth: { user }} = store.getState();
    //   if (!user) {
    //     // oops, not logged in, so can't be here!
    //     replace('/');
    //   }
    //   cb();
    // }

    // if (!isAuthLoaded(store.getState())) {
    //   store.dispatch(loadAuth()).then(checkAuth);
    // } else {
    //   checkAuth();
    // }
  };
  
  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/">
      { /* Home (main) route */ }
      <IndexRoute component={ProjectList}/>
      
    </Route>
  );
};

// { /* Routes requiring login */ }
//       <Route onEnter={requireLogin}>
//         <Route path="chat" component={Chat}/>
//         <Route path="loginSuccess" component={LoginSuccess}/>
//       </Route>

//       { /* Routes */ }
//       <Route path="about" component={About}/>
//       <Route path="login" component={Login}/>
//       <Route path="pagination" component={Pagination}/>
//       <Route path="survey" component={Survey}/>
//       <Route path="widgets" component={Widgets}/>

//       { /* Catch all route */ }
//       <Route path="*" component={NotFound} status={404} />