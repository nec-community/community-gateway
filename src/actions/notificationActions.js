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

export const notify = (message, type = 'success', length = 5000) => (dispatch) => {
  dispatch(showNotification(message, type));
  clearTimeout(timeout);
  timeout = setTimeout(() => dispatch(hideNotification()), length);
};

export const notifyError = err => (dispatch) => {
  let message = err.message ? err.message : err;
  if (message.indexOf('MetaMask') !== -1) {
    message = message.substr(message.indexOf('MetaMask'));
    message = message.substr(0, message.indexOf('\n'));
  }
  if (message === 'Invalid status 6985') message += ' - User denied tx';
  notify(message, 'error')(dispatch);
};
