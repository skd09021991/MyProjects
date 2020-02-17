import decode from 'jwt-decode';
import axios from 'axios';
import {API} from './constant';
export default class AuthService {
    constructor() {
        
        this.fetch = this.fetch.bind(this)
        this.login = this.login.bind(this)
        this.getProfile = this.getProfile.bind(this)  
        
    }

    login(email, password, recaptcha_response) {
        // Get a token and store the email id and user name in the local storage and in the login api there is also recaptcha_response which is in the header
        
        let body = {
                    email,
                    password,
                    recaptcha_response
                }
        return axios.post(API +'/login', body)
                .then(res => {
                       
                    if(res && res.data && res.data.token){
                                //console.log(body);
                                localStorage.setItem('currentUserEmail', email);
                                localStorage.setItem('name', res.data.name);
                                this.setToken(res.data.token)
                                return Promise.resolve(res);

                                
                            }        
                })
                .catch(function (error) {
                    if (error.response) {
                      // The request was made and the server responded with a status code
                      // that falls out of the range of 2xx
                      console.log(error.response.data);
                      console.log(error.response.status);
                      console.log(error.response.headers);
                    } else if (error.request) {
                      // The request was made but no response was received
                      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                      // http.ClientRequest in node.js
                      console.log(error.request);
                    } else {
                      // Something happened in setting up the request that triggered an Error
                      console.log('Error', error.message);
                    }
                    console.log(error.config);
                  });
    }
    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken()
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            }
            else
                return false;
            }
            catch (err) {
                return false;
            }
    }

    setToken(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken)
    }
    

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token')
    }
    

    logout() {
        // Clear user token and profile data from localStorage
        return axios.post(API+'/logout', {email: localStorage.getItem('currentUserEmail')})
            .then(res => {
                
                localStorage.removeItem('id_token');
                localStorage.removeItem('name');
                return Promise.resolve(res);
            })
            .catch(function (error) {
                if (error.response) {
                  // The request was made and the server responded with a status code
                  // that falls out of the range of 2xx
                  console.log(error.response.data);
                  console.log(error.response.status);
                  console.log(error.response.headers);
                } else if (error.request) {
                  // The request was made but no response was received
                  // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                  // http.ClientRequest in node.js
                  console.log(error.request);
                } else {
                  // Something happened in setting up the request that triggered an Error
                  console.log('Error', error.message);
                }
                console.log(error.config);
              });
        
       
    }

    getProfile() {
        //Decode the jwt token in the localstorage and collect the profile information from the jwt token
        return decode(this.getToken());
        
    }


    fetch(url, options) {
        // performs api calls sending the required authentication headers
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        if (this.loggedIn()) {
            headers['Authorization'] = 'Bearer ' + this.getToken()
        }
        //console.log('check options', options);
        return fetch(url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(response => response.json())
            
    }

    _checkStatus(response) {
        // raises an error in case response status is not a success
        //console.log('check status was hit')
        if (response.status >= 200 && response.status < 300) {
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }

}
/*
This class fetch the jwt token from the given API by the post method , in the local storage it store the current user mail id and the token , in retun 
it also pass the recaptcha_response with that api .
and there is also logout method which also fetch the api for the logout and remove the token from the loacal storage .

*/