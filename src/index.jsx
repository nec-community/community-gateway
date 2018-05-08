import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import ReactGA from 'react-ga';
import App from './components/App/App';
import store from './store';

ReactGA.initialize('UA-117611254-2');
ReactGA.pageview(window.location.href.split('#')[1]);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
