import React, { Component } from 'react';
import AuthService from './AuthService';
import {API} from './constant';

export default function withAuth(AuthComponent) {
    const Auth = new AuthService(API +'/login');
    return class AuthWrapped extends Component {
        constructor() {
            super();
            this.state = {
                user: null
            }
        }
        //THis method checks the user if it is logged in or not , if he/she is already logged in then get the profile information and display it and 
        // when the user is logged out then it takes back the user to the login page .
        componentWillMount() {
            if (!Auth.loggedIn()) {
                this.props.history.replace('/login')
            }
            else {
                try {
                    
                    const user = localStorage.getItem('name')
                    this.setState({
                        user
                    })
                }
                catch(err){
                    Auth.logout()
                    this.props.history.replace('/login')
                }
            }
        }
        //This render method checks the user and displays the profile name of the person from the local storage which is set in the login method 
        render() {
            if (this.state.user) {
                return (
                    <AuthComponent history={this.props.history} user={this.state.user} />
                )
            }
            else {
                return null
            }
        }
    };
}