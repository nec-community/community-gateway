import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import ReactGA from 'react-ga';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App/App';
import store from './store';

ReactGA.initialize('UA-117611254-2');

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
