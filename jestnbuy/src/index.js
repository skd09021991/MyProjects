import React from 'react';
import ReactDOM from 'react-dom';
import { createStore , combineReducers } from 'redux';
import { Provider } from 'react-redux';
import loginReducer from './store/reducers/loginReducer';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './fonts/helveticaneue/HelveticaNeue.ttf'
// import {BrowserRouter as Router  } from 'react-router-dom';

const rootReducer = combineReducers( {
    loginRed : loginReducer
})

const store = createStore(  rootReducer  )

ReactDOM.render(<Provider store = { store } > <App /> </Provider> , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
