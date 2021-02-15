import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import ReactGA from 'react-ga';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App/App';
import store from './store';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

ReactGA.initialize('UA-156671651-3');

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
