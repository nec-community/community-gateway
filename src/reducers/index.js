import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import account from './accountReducer';
import notification from './notificationReducer';
import proposal from './proposalReducer';
import token from './tokenReducer';
import delegate from './delegateReducer';
import trader from './traderReducer';

export default combineReducers({
  routing: routerReducer,
  account,
  notification,
  proposal,
  token,
  delegate,
  trader,
});
