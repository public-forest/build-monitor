import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
import projectListReducer from '../projectlist/ProjectListActions';
import loginReducer from '../login/LoginActions';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  projectlist: projectListReducer,
  auth: loginReducer,
});