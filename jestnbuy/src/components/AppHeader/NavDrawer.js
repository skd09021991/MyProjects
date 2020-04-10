import React from 'react';
import { connect } from 'react-redux';
import * as actionType from '../../store/actions';

import './NavDrawer.scss';
import { Link } from 'react-router-dom';

const NavDrawer  =  (props)  => {
    
    let classes  =  'navDrawer';
    
    if (props.show)
    {
        classes  =  'navDrawer open'
    }
    console.log( props.isLoggedIn )

    const afterLoginOption = <li>
                                <a  
                                    onClick = { props.toggleLoginScreen }
                                    href = '#' 
                                    // rel = "noopener noreferrer"
                                >
                                Hi, { props.userData.name }
                                </a>
                                <li>
                                    <Link to = '/profile' >Profile</Link>
                                </li>
                                <li>
                                    <a> Logout </a>
                                </li>
                            </li>
    return (
        <div className = { classes }>
            <ul>
                <li>
                    <a 
                        href = 'http://cashnsave.com/'
                        target = "_blank"     
                        rel = "noopener noreferrer"
                    >
                    Blog
                    </a>
                </li>
                {
                    props.isLoggedIn ? 
                    <li>
                        <a  
                            onClick = { props.toggleLoginScreen }
                            href = '#' 
                            // rel = "noopener noreferrer"
                        >
                        Hi, { props.userData.name }
                        </a>
                        <li>
                            <Link to = '/profile' >Profile</Link>
                        </li>
                        <li>
                            <a> Logout </a>
                        </li>
                    </li>
                    :
                    <li>
                        <a  
                            onClick = { props.toggleLoginScreen }
                            href = '#' 
                            // rel = "noopener noreferrer"
                        >
                        Login
                        </a>
                    </li>      
                }
            </ul>
        </div>
    );
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


export default connect( mapStateToProps , mapDispatchToProps  )(NavDrawer);
