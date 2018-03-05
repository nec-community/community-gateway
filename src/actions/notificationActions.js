import {
  SHOW_NOTIF,
  HIDE_NOTIF,
} from './actionTypes';

let timeout;

export const showNotification = (message, notifType) => ({
  type: SHOW_NOTIF,
  message,
  notifType,
});

export const hideNotification = () => ({
  type: HIDE_NOTIF,
});

export const notify = (message, type = 'success', length = 2000) => (dispatch) => {
  dispatch(showNotification(message, type));
  clearTimeout(timeout);
  timeout = setTimeout(() => dispatch(hideNotification()), length);
};
