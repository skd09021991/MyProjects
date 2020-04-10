import React, {Component} from 'react';
import '../scss/header.scss';
import { Link, withRouter } from 'react-router-dom';
//import {routes} from '../routes';
class Header extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      activeTab: window.location.pathname === '/' ? 'home' : window.location.pathname.split('/')[1],
      
      isOtherPage: true
    }
    // this.setState = this.state.url;
    // console.log(this.state.isHomePage);
    // var isActive = window.location.pathname !== '/';
    // var className = isActive ? 'header-bg-2' : '';
    // console.log(className);
    
  }
  componentDidUpdate(prevProps) {
    if(this.props.location.pathname !== prevProps.location.pathname) {
      this.props.location.pathname === '/' ? this.setActiveTab('home') : this.setActiveTab(window.location.pathname.split('/')[1])
      window.scrollTo(0, 0)
    }
  }

  
menuToggle = (e) => {
  var menuClass = document.getElementById("menu");
  menuClass.classList.toggle('menuOpen');
}

setActiveTab = (activeTab) => {
  //console.log('check state', this);
  // this.menuToggle();
  var menuClass = document.getElementById("menu");
  menuClass.classList.remove('menuOpen');
  this.setState({
    activeTab
  })
}

  render() {
    const {activeTab} = this.state;
    return (
      <div>
        <header>
         <div id="header" className={activeTab === 'home' ? 'header header1' : 'header header2'}>
            {/* {headerBg} */}
            <div className="topbar">
              <div className="logo animated slideInDown">
                <a href="/"><img src='/media/logo.png' alt="Logo" /></a>
              </div>
              <div className="menu-cover top-nav">
                <div className="menus">
                  <div className="menu-res">
                    {/* <h2><i class="fa fa-bars"></i></h2> */}
                    <input id="menu-toggle" type="checkbox" />
                    <label className='menu-button-container' htmlFor="menu-toggle">
                      <div onClick={this.menuToggle} className='menu-button'></div>
                    </label>
                  </div>
                  <ul id="menu" className=" menu animated slideInDown">
                    <li ><Link onClick={() => this.setActiveTab('home')} to="/"><div className={activeTab === 'home' ? "active": ''}>Home</div></Link></li>
                    <li ><Link  onClick={() => this.setActiveTab('about')} to="/about" ><div  className={activeTab === 'about' ? "active" : ''}>About</div></Link></li>
                    <li ><Link onClick={() => this.setActiveTab('career')} to="/career"><div  className={activeTab === 'career' ? "active" : ''}>Career</div></Link></li>
                    <li ><Link onClick={() => this.setActiveTab('contact')} to="/contact"><div  className={activeTab === 'contact' ? "active" : ''}>Contact</div></Link></li>
                    <a className="login-b" href="true" >Login</a>
                  </ul>
                  
                </div>
              </div>
            </div>
            <div className="clearfix"></div>
          </div>
          
        </header>
        {this.props.children}
      </div>
    )
  }
}


export default withRouter(Header);


