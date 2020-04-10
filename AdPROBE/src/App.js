import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route} from 'react-router-dom';
//import {routes} from './routes';
import './App.scss';
import Header from './components/Header';
import Home from './components/Home';
//import Functions from './components/Functions';
//import Servicegrid from './components/servicesGrid';
import Footer from './components/Footer';
import About from './components/About';
import Career from './components/Career';
import Contact from './components/Contact';
import Privacy from './components/Privacy';

import Cookie from './ExtraComponents/Cookie'


//import $ from "jquery";


class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
     // url: window.location.href
    };
    

  }



  render() {
    // var isActive = window.location.pathname === this.props.to;
    // var className = isActive ? 'active' : '';
    // console.log(window.location.pathname);
    
    return (
      <Router>
       
      <div className="app">
      
        <div className="app-header">
          <Header />
           <Route exact={true} path={"/"} component={Home} />
          <Route exact={true} path={"/about"} component={About} />
          <Route exact={true} path={"/career"} component={Career} />
          <Route exact={true} path={"/contact"} component={Contact} /> 
          <Route exact={true} path={"/privacy"} component={Privacy} /> 
           
          {/* <Functions />
          <Servicegrid /> */}
          {/* <Content /> */}
          
          <Footer />
          
        </div>
        
        <Cookie 
        expires={150}/>
      </div>
      
      </Router>
    )
  }
}





export default App;
