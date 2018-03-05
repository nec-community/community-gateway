import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import account from './accountReducer';
import notification from './notificationReducer';
import proposal from './proposalReducer';

export default combineReducers({
  routing: routerReducer,
  account,
  notification,
  proposal,
});
