import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Chart from './Components/Chart';
import registerServiceWorker from './registerServiceWorker';
import { Route, BrowserRouter as Router } from 'react-router-dom';
// Our Components
import Login from './Components/Login';

ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={App} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/chart" component={Chart} />
        </div>
    </Router>
    , document.getElementById('root')
);
registerServiceWorker();


/*
The react-dom package provides DOM-specific methods that can be used at the top level of your app and it renders the App component which is App.js 
and App.js contains the jsx . The Document method getElementById() returns an Element object representing the element whose id property matches the
 specified string. 
Since element IDs are required to be unique if specified, they're a useful way to get access to a specific element quickly.

There are many things which is imported like React class , ReactDom class and other components from the src.

*/
