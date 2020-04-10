import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionType from '../../store/actions';


import logo from '../../assets/logo.png';
import './AppHeader.scss';
import ToggleButton from '../ToogleButton/ToggleButton';
import SearchBox from './SearchBox';
//import categoryList from '../Category/Category'
import CategoryDrawer from './CategoryDrawer';
import Backdrop from '../Backdrop/Backdrop';
import NavDrawer from './NavDrawer';
import LoginScreen from '../LoginScreen/Login';

import {Link }from 'react-router-dom';

class AppHeader extends Component {

    state  =  {
        sideDrawerOpen      : false,
        navDrawerOpen       : false,
        isTop               : true,
        appHeaderClass      : 'AppHeader',
        loginDisplayClass   : false,
        showLoginInScreen   : false,
        accNavDrawerOpen    : false,
    };
    navDrawerToggleClickHandler  =  ()  => {
        this.setState( ( prevState )  =>  {
            return { navDrawerOpen : !prevState.navDrawerOpen };
        } );
        //console.log(this.state.navDrawerOpen);
    };
    categoryDrawerToggleClickHandler  =  ()  => {
        this.setState( ( prevState ) => {
            return {sideDrawerOpen : !prevState.sideDrawerOpen};
        });
        //console.log('button clicked and state ' + this.state.sideDrawerOpen)
    };
 
    componentDidMount(){
        document.addEventListener('scroll',() => {
            const isTop  =  window.scrollY > 200;
            if( isTop ){
                //console.log('you reached 200px down')
                this.setState({ appHeaderClass : 'AppHeader animated'});
            };
            if( window.scrollY < 200 ) {
                this.setState( { appHeaderClass : 'AppHeader'});
            };
        })
    }
    
    toggleLoginScreen = () => {
        
        this.setState( ( prevState ) => {
            return { loginDisplayClass : !prevState.loginDisplayClass }
        })
    }

    toggleAccountNavigation = () =>{
        console.log('toggling accNavBar')
        this.setState( (prevState) =>{
            return { accNavDrawerOpen : !prevState.accNavDrawerOpen }
        })
    }

    
    render(){
        let categoryDrawer;
        let backdrop;
        let navDrawerBackdrop;
        let loginScreen ;
        let loggingNav;
        let accNavDrawer;
        //let headerClass  =  'AppHeader'
        
        if ( this.state.sideDrawerOpen ){
            categoryDrawer  =  <CategoryDrawer/>;
            backdrop  =  <Backdrop click  =  { this.categoryDrawerToggleClickHandler }/>;
        };

        if ( this.state.navDrawerOpen ){
            navDrawerBackdrop  =  <Backdrop click  =  { this.navDrawerToggleClickHandler }/>;

        };

        if (this.state.loginDisplayClass){
            loginScreen  =  <LoginScreen click =  { this.toggleLoginScreen }   />;
        };
        // onMouseOver = { () => this.setState({ accNavDrawerOpen : true }) } 
        if ( this.state.accNavDrawerOpen ){
            accNavDrawer = <div  className='accountNav' onMouseOver = { () => this.setState({ accNavDrawerOpen : true }) } >
            <ul   >
                <li>
                    <Link to = '/profile' >Profile</Link>
                </li>
                <li>
                    <a onClick={ this.props.toggleLoginStatus }   >
                        Logout
                    </a>
                </li>
            </ul>
        </div>
        }
        // console.log( this.props.isLoggedIn )
        if ( this.props.isLoggedIn ){
           
            loggingNav = <a id='cadidateName' 
                            onMouseOver={ this.toggleAccountNavigation } 
                            // onMouseOut = { this.toggleAccountNavigation } 
                            onClick={ this.toggleAccountNavigation }
                        >
                Hi,{ this.props.userData.name }
                {/* {accNavDrawer } */}
            </a>
        }else{
            loggingNav = <a  id = 'loginLink'
                                onClick = { this.toggleLoginScreen } 
                                rel = "noopener noreferrer"
                            >
                                Login
                            </a>
        }


        return(
            
        <div>
            {loginScreen}
            
            <div className =  { this.state.appHeaderClass }>
                <div className = 'Content'>
                    <div className = 'Logo'>
                        <Link to = '/'>
                            <img  src = { logo } alt = ''/>

                        </Link>
                        
                    </div>
                    <SearchBox className = 'SearchBoxContainer'/>
                    <div className = "HeaderToggleButton" onClick =  { this.navDrawerToggleClickHandler }>
                        <ToggleButton/>
                    </div>
                    <NavDrawer show  =  { this.state.navDrawerOpen } toggleLoginScreen =  { this.toggleLoginScreen } navDrawerToggleClickHandler = { this.navDrawerToggleClickHandler } />
                    { navDrawerBackdrop }
                    <div className = 'Links' >
                        { loggingNav } 
                        { accNavDrawer }
                        <a  id = 'blogLink'
                            href = 'http://cashnsave.com/'
                            target = "_blank" 
                            rel = "noopener noreferrer"
                        >
                            Blog
                        </a>
                    </div>  
                    
                </div>
                <div className = 'SmallScreenHeader'>
                    <div className = 'content'>
                        <button onClick  =  {this.categoryDrawerToggleClickHandler} className = 'ToggleCategoryList'  >
                            Category
                            <span className = 'Triangle' ></span>
                        </button>
                        <SearchBox  />
                    </div> 

                </div>
                { backdrop }
                {categoryDrawer}
                {/* { accNavDrawer } */}
            </div>
        </div>
        
        );
    };
};


const mapStateToProps = ( state ) =>{
    return {
        isLoggedIn : state.loginRed.isLoggedIn,
        userData    : state.loginRed.userData 
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleLoginStatus   : () => dispatch( { type : actionType.TOGGLE_LOGIN_STATUS }),
        setUserData         : ( userData ) => dispatch( { type : actionType.SET_USER_DATA, data : userData })
    }
}


export default connect( mapStateToProps , mapDispatchToProps  )(AppHeader);
