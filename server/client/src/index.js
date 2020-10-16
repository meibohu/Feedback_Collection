import 'materialize-css/dist/css/materialize.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
//redux
import reduxThunk from 'redux-thunk';
import{ createStore, applyMiddleware } from 'redux';

import App from './components/App';
import reducers from './reducers';

import axios from 'axios';
window.axios = axios;


//single dummy reducer:
// const store = createStore(() => [], {}, applyMiddleware());
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

//first: root component, second: where we are attempting to render thata component to inside dom.
ReactDOM.render(
  <Provider store = {store}><App /></Provider>,   //provider will inform all of its children components.
  document.querySelector('#root')
);

console.log('STRIPE KEY IS', process.env.REACT_APP_STRIPE_KEY);
console.log('Environment is', process.env.NODE_ENV);
