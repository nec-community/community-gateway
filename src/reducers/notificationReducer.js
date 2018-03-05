import {
  SHOW_NOTIF,
  HIDE_NOTIF,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  displayed: false,
  type: 'neutral',
  message: 'Initial message',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_NOTIF:
      return {
        ...state,
        displayed: true,
        message: action.message,
        type: action.notifType,
      };

    case HIDE_NOTIF:
      return {
        ...state,
        displayed: false,
      };

    default:
      return state;
  }
};
