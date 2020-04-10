import React , { Component } from 'react';
import { connect } from 'react-redux';
import * as actionType from '../../store/actions';


import CloseIcon from '@material-ui/icons/Close';
import FacebookIcon from '../../assets/facebook.png';
import GoogleIcon from '../../assets/google.png';
import  axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
//import Backdrop from '../Backdrop/Backdrop';
import './Login.scss';

class LoginScreen extends Component{

    state=  {
        email        :  '',
        password     :  '',
        firstName    :  '',
        lastName     :  '',
        gender       :  '',
        currentForm  :  'Login',
        recaptchaToken: '',
    }


    onFirstNameBlurHandler =  ( value ) => {
        if( value.length ===  0){
            this.setState(  {
                firstName_empty_input_error  :  true,
            })
        }else{
            this.setState(  {
                firstName_empty_input_error  :  false,
            })
        }
    }
    
    onLastNameBlurHandler =  ( value ) => {
        if( value.length ===  0){
            this.setState(  {
                lastName_empty_input_error  :  true,
            })
        }else{
            this.setState(  {
                lastName_empty_input_error  :  false,
            })
        }
    }

    onEmailBlurHandler =  ( value ) =>  {

        if ( value.length ===  0 ) {
            this.setState( { 
                email_empty_input_error  :  true,
                email_invalid_input_error  :  false
            })
            this.setState({  })
        }
        if( value.length !== 0 && !(  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) ){
            this.setState({ 
                email_invalid_input_error  :  true , 
                email_empty_input_error    :  false
            })
            console.log('invalid blur happened ', value , value.length )
        }
        else if(  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)){
            this.setState({ 
                email_invalid_input_error  :  false , 
                email_empty_input_error  :  false
            })
        }

    }

    onPasswordBlurHandler = (value) => {
        if( value.length ===  0){
            this.setState(  {
                password_empty_input_error  :  true,
            })
        }else{
            this.setState(  {
                password_empty_input_error  :  false,
            })
        }

    }

    changeHandler = (event) => {
        this.setState({ 
                [event.target.name]  :  event.target.value 
        })
        // console.log(this.state)
    }

    loginSubmitHandler = (event) => {
        event.preventDefault();
        let loginFormVal  = {
            email        :  this.state.email,
            password     :  this.state.password
        }
        console.log(loginFormVal)
        axios.post( process.env.REACT_APP_LOGIN_FORM_ENDPOINT, loginFormVal)
        .then( res =>{
            if (res.status === 200 ){
                console.log('logged in sucessfully ')
                this.props.toggleLoginStatus()
                this.props.setUserData({ "name" : 'Abhishek' })
                this.props.click()
            }
        })
        .catch(err =>{
            console.log('cannot login')
        })
        
    }
    signupSubmitHandler = (event) => {
        // event.preventDefault();
        let signupFormVal = {
            firstName    :  this.state.firstName,
            lastName     :  this.state.firstName,
            email        :  this.state.email,
            password     :  this.state.password,
            gender       :  this.state.gender,
        }
        console.log(signupFormVal);
        axios.post( process.env.REACT_APP_SINGUP_FORM_ENDPOINT, signupFormVal)
        
    }
    resetPasswordSubmitHandler = (event) => {
        event.preventDefault();
        console.log(this.state.email);
        axios.post( process.env.REACT_APP_RESET_PASSWORD_FORM_ENDPOINT, this.state.email )
    }
    stateReset = () => {
        this.setState({
            email        :  '',
            password     :  '',
            firstName    :  '',
            lastName     :  '',
            gender       :  '',
        })
    }

    formSelector =  () =>  {
        if (this.state.currentForm ===  'Login'){
            this.setState({ currentForm  :  'Signup' })
        }
        else if ( this.state.currentForm ===  'Signup' ){
            this.setState({ currentForm :  'Login' })
        }
        else if (this.state.currentForm ===  'ResetPassword' ){
            this.setState({ currentForm  :  'Login'})
        }
        this.stateReset()
    }

    resetFormHandler = ()=> {
        this.setState({ currentForm :  'ResetPassword'})
    }

    verifyCallback = (recaptchaToken) =>  {
        this.setState({
            recaptchaToken : recaptchaToken
        })
    }


    render(){
        let displayForm;
        let header;
        let bottomNavLabel;
        let recaptcha;
        // let loginButton,  signupButton, resetPasswordButton;

        

        const socialMediaLogin =  (
            <div className = 'SocialLogin'>
                <button className = 'FacebookLogin' >
                    <span><img src  = { FacebookIcon } alt = ''/> </span>
                    <span>Login with Facebook</span>
                </button>
                <button className = 'GoogleLogin' >
                    <span><img src = { GoogleIcon } alt= '' /> </span>
                    <span>Login with Google</span>
                </button>
            </div>
        )

        let email_invalid_input_error_label, 
        email_empty_input_error_label , 
        password_empty_input_error_label,
        firstName_empty_input_error_label,
        lastName_empty_input_error_label;
        const err_label_style =  {
            color        :  'red', 
            fontSize     :  '10px',
            listStyle    :  'none',
            paddingLeft  :  '10px',
            // float :  'right'
        }
        if( this.state.email_invalid_input_error ){
            email_invalid_input_error_label =  (  <li  style = { err_label_style }  >Enter Valid Email</li> )
        }
        if( this.state.email_empty_input_error){
            email_empty_input_error_label =  (  <li  style = { err_label_style }  >Field Cannot Be Empty</li> )
        }
        if( this.state.password_empty_input_error){
            password_empty_input_error_label =  (  <li  style = { err_label_style }  >Field Cannot Be Empty</li> )
        }
        if( this.state.lastName_empty_input_error ){
            lastName_empty_input_error_label =  (  <li  style = { err_label_style }  >Field Cannot Be Empty</li> )
        }
        if( this.state.firstName_empty_input_error ){
            firstName_empty_input_error_label =  (  <li  style = { err_label_style }  >Field Cannot Be Empty</li> )
        }


        switch( this.state.currentForm ){
            // let recaptcha
            case 'Login' : 
                header = 'Login';
                bottomNavLabel =  'New User Signup here'
                let loginButton;


                if ( process.env.REACT_APP_MODE === 'production' ||  process.env.REACT_APP_MODE === 'staging' ){
                    console.log( 'it is production made', process.env.REACT_APP_MODE )
                    loginButton  =  (<button id = 'loginButton' type = 'submit' style = {{ backgroundColor : '#b8b8be!important' }} disabled  >Login</button>)
                    if( this.state.recaptchaToken){
                        loginButton =  (<button id = 'loginButton' type = 'submit' style = {{ backgroundColor : '#f6af2e' }}  >Login</button>)
                    }
                    
                    recaptcha = <div className='recaptcha' > <ReCAPTCHA sitekey = "6Lc57sMUAAAAAEpCDQ-UFqwaOlgNIpLLbF1VNZ_2" onChange = { this.verifyCallback } /> </div>
                }
                else{
                    loginButton = (<button id = 'loginButton' type = 'submit'  >Login</button>)
                }



                displayForm =  (
                    <div>
                        <form  className = 'Form' id = 'loginForm'  onSubmit = { this.loginSubmitHandler } method = 'POST' action = { process.env.REACT_APP_LOGIN_FORM_ENDPOINT }  >
                            <input type = 'email' id = 'email' name = 'email' placeholder = 'Username' value = { this.state.email } 
                                onChange =  { this.changeHandler } 
                                required
                                onBlur =  { () =>  this.onEmailBlurHandler( this.state.email )}
                                />
                            { email_invalid_input_error_label }
                            { email_empty_input_error_label}
                            <input type = 'password' id = 'password' name = 'password' placeholder = 'Password' value = { this.state.password } 
                                onChange =  { this.changeHandler } 
                                required
                                onBlur =  { ()=>  this.onPasswordBlurHandler( this.state.password  )  }
                                />
                            { password_empty_input_error_label }
                            <a className = 'ResetPass' href= '#' rel = "noopener noreferrer" onClick=  { this.resetFormHandler }>Forgot Password</a>
                            {/* <button id = 'loginButton' type = 'submit'  >Login</button> */}
                            {recaptcha}
                            {loginButton}
                        </form>
                        { socialMediaLogin }
                    </div>
                );
            break;

            case 'Signup' : 
                header = 'Signup'
                bottomNavLabel =  'Already User Signin here'
                let signupButton;


                if ( process.env.REACT_APP_MODE === 'production' ||  process.env.REACT_APP_MODE === 'staging' ){
                    console.log( 'it is production made', process.env.REACT_APP_MODE )
                    signupButton  =  (<button id = 'signupButton' type = 'submit' style = {{ backgroundColor : '#b8b8be!important' }} disabled  >Signup</button>)
                    if( this.state.recaptchaToken){
                        signupButton =  (<button id = 'signupButton' type = 'submit' style = {{ backgroundColor : '#f6af2e' }}  >Signup</button>)
                    }
                    recaptcha =<div className='recaptcha' > <ReCAPTCHA sitekey = "6Lc57sMUAAAAAEpCDQ-UFqwaOlgNIpLLbF1VNZ_2" onChange = { this.verifyCallback } /> </div>
                }
                else{
                    signupButton = (<button id = 'signupButton' type = 'submit'  >Signup</button> )
                }

                displayForm =  (
                    <div>
                        <form className = 'Form'  id = 'signupForm' method = 'POST' onSubmit = { this.signupSubmitHandler }  action = { process.env.REACT_APP_SINGUP_FORM_ENDPOINT } >
                                <input type = 'text' id = 'firstName' name = 'firstName' placeholder = 'First Name' value = { this.state.firstName } 
                                        onChange =  { this.changeHandler } 
                                        required
                                        onBlur =  { () =>  this.onFirstNameBlurHandler( this.state.firstName )}
                                    />
                                { firstName_empty_input_error_label }
                                <input type = 'text' id = 'lastName' name = 'lastName' placeholder = 'Last Name' value = { this.state.lastName } 
                                    onChange =  { this.changeHandler } 
                                    required
                                    onBlur = { ()=>  this.onLastNameBlurHandler( this.state.lastName )}
                                    />
                                { lastName_empty_input_error_label }
                                <input type = 'email' id = 'email' name = 'email' placeholder = 'Username' value = { this.state.email } 
                                    onChange =  { this.changeHandler } 
                                    required
                                    onBlur = { () =>  this.onEmailBlurHandler( this.state.email )}
                                    />
                                { email_invalid_input_error_label }
                                { email_empty_input_error_label}
                                <input type = 'password' id = 'password' name = 'password' placeholder = 'Password' value = { this.state.password } 
                                    onChange =  { this.changeHandler } 
                                    required
                                    onBlur =  { ()=>  this.onPasswordBlurHandler( this.state.password  )  }
                                    />
                                { password_empty_input_error_label }
                                <div className = 'Checkbox' >
                                    <input  type = 'radio' id = 'radioMale' name = 'gender' value= 'male'  
                                    onChange =  { this.changeHandler } /> 
                                    <label>Male</label>
                                </div>
                                {/* { recaptcha } */}
                                <div className = 'Checkbox' >
                                    <input  type = 'radio'  id = 'radioFemale' name = 'gender' value= 'female' 
                                    onChange =  { this.changeHandler } />
                                    <label>Female</label>
                                </div>
                                {/* <button id = 'signupButton' type = 'submit'  >Signup</button> */}
                                {recaptcha}
                                <div style={ { clear: 'both' } }  ></div>
                                { signupButton }
                        </form>
                        { socialMediaLogin }
                    </div>
                );
            break

            case 'ResetPassword' : 
                header = 'Reset Password'
                bottomNavLabel =  'Go back to signin'
                let resetPasswordButton;
                if ( process.env.REACT_APP_MODE === 'production' ||  process.env.REACT_APP_MODE === 'staging' ){
                    console.log( 'it is production made', process.env.REACT_APP_MODE )
                    // loginButton  =  (<button type = 'submit' style = {{ backgroundColor : '#b8b8be!important' }} disabled > Submit </button>)
                    resetPasswordButton  =  (<button id = 'resetButton' type = 'submit' style = {{ backgroundColor : '#b8b8be!important' }} disabled  >Reset Password</button>)
                    if( this.state.recaptchaToken){
                        // loginButton =  (<button type = 'submit' style = {{ backgroundColor : '#f6af2e' }} > Submit </button>)
                        resetPasswordButton =  (<button id = 'resetButton' type = 'submit' style = {{ backgroundColor : '#f6af2e' }}  >Reset Password</button>)
                    }
                    
                    recaptcha = <div className='recaptcha' > <ReCAPTCHA sitekey = "6Lc57sMUAAAAAEpCDQ-UFqwaOlgNIpLLbF1VNZ_2" onChange = { this.verifyCallback } /> </div>
                }
                else{
                    resetPasswordButton = (<button id = 'resetButton' type = 'submit' >Reset Password</button>)
                }


                displayForm = (
                    <div>
                        <form className = 'Form' id = 'passwordResetForm'  onSubmit = { this.resetPasswordSubmitHandler } method = 'POST' action = { process.env.REACT_APP_RESET_PASSWORD_FORM_ENDPOINT }>
                            <input type = 'email' name = 'email' placeholder = 'Enter your registered Email Id' value = { this.state.email } 
                                onChange =  { this.changeHandler } 
                                required
                                onBlur = { () =>  this.onEmailBlurHandler( this.state.email )}
                            />
                            { email_invalid_input_error_label }
                            { email_empty_input_error_label}
                            {/* <button id = 'resetButton' type = 'submit' >Reset Password</button> */}
                            { resetPasswordButton }
                        </form>
                    </div>
                )
            break
            default : 
            break
        }
        
        return(
            <div className = 'LoginScreen' onClick = { this.props.click }>
                <div className = 'UserLogin' >
                <div className = 'Box' onClick = { this.props.click} >
                        <div className = 'Header'>
                            <h2>{ header } </h2>
                            <div className = 'closeIcon' style = {{ display : 'inline-block' ,float : 'right'}} onClick = { this.props.click }>
                                <CloseIcon className = 'CloseIcon' />
                            </div>
                        </div>
                        { displayForm }
                        <div>
                            <a className = 'NewUserSignup' rel = "noopener noreferrer" onClick = { this.formSelector }>{ bottomNavLabel }</a>                           
                        </div>
                    </div>
                </div>
            </div>
        ) 
    }
    
}

const mapDispatchToProps = dispatch => {
    return {
        toggleLoginStatus   : () => dispatch( { type : actionType.TOGGLE_LOGIN_STATUS }),
        setUserData         : ( userData ) => dispatch( { type : actionType.SET_USER_DATA, data : userData })
    }
}


export default connect( null, mapDispatchToProps )(LoginScreen);
