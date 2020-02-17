import React, { Component } from 'react';
import './Login.css';
import Button from '@material-ui/core/Button';
import ReCAPTCHA from "react-google-recaptcha";
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import LockIcon from '@material-ui/icons/Lock';
import AuthService from './AuthService';


class LoginForm extends Component {    // this is the class App which extends the Component class amd the components class extends from the react class

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    
    };
    
    this.verifyCallback = this.verifyCallback.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.Auth = new AuthService(); 
    
  }
  
verifyCallback(recaptchaToken) {
    // Here you will get the final recaptchaToken!!!  
    this.setState({
      recaptchaToken
    })
    //console.log(recaptchaToken, "<= your recaptcha token")
  }
componentWillMount(){
    if(this.Auth.loggedIn())
        this.props.history.replace('/');
} 

handleFormSubmit(e){
  e.preventDefault();
  const { recaptchaToken } = this.state;
  
    let self = this;
    this.Auth.login(this.state.email,this.state.password, recaptchaToken)
    .then(res =>{
       this.props.history.replace('/');
    })
    .catch(err =>{
      console.log('error', err.response);
        if(err.response.status === 403){
          self.setState({
            error: 'Invalid Email or Password',
            
          })
         
         setTimeout(() => {        // this method displays error for some time
            this.setState(
              {error: '', password:'', recaptchaToken: null}, // this delete the  previous values and make it null
              
              )}, 1500);
         
          
          this.captcha.reset(); // this reset() method reset the captcha without reloading the whole page
          this.form.reset();    // this reset() method reset the form without reloading the whole page 
        }
    })
  
}
handleChange = (e) =>{
    this.setState(
      {
          [e.target.name]: e.target.value
      }
  )  
    
}

render (){
  const { email, password, recaptchaToken, error } = this.state;
    const errors = this.props.errors || {}
    return (
    <div className="App">
      {<form onSubmit={this.handleFormSubmit} ref={(form) => this.form = form}>
     
        <div>
          <TextField 
            className="text"
            error={errors.email}
            name="email"
            fullWidth autoFocus required 
            style={{marginTop:'50px' , maxWidth: '320px' }}
            placeholder='Email Id'
            variant='outlined'
            margin="normal"
            onChange={this.handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div>
          <TextField 
            className="text"
            name="password"
            error={errors.password} 
            fullWidth required 
            style={{marginTop:"20px", marginBottom: '20px' , maxWidth: "320px"}}
            type="password"
            placeholder="Password"
            variant='outlined'
            margin="normal"
            onChange={this.handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ), 
            }}
   
          />  
          {error && <div className="errorBox">{error}</div>}
        </div>
        <ReCAPTCHA
          ref={(r) => this.captcha = r}
          sitekey="6Lc57sMUAAAAAEpCDQ-UFqwaOlgNIpLLbF1VNZ_2"
           onChange={this.verifyCallback}        

        /> 
        <Button className="blurButton" style={{marginTop:'20px', marginBottom: '20px' , maxWidth: '320px' ,backgroundColor:"#cc0000" }}  
                 type='submit'
                 variant="contained" 
                 fullWidth required
                 disabled={!email || !password || !recaptchaToken} 
            >
              SUBMIT
        </Button> 
      </form>}
    
           
    </div>
    );  
  }
}
export default LoginForm;

/*
This class have the login page with 2 text fields i.e email id field and password field,
it also contains the google-reCaptcha having the V3 sitekey and and under it there is login button 
once the user clicks the login button , it renders another page on the basis of conditions

methods
.......

 

 verifyCallback(recaptchaToken) = This method is called when the captcha is loaded and for the verification it is called . Intially it's state is false 
                              in the constructor but after when it is loaded and the user gives correct information and the response is collected as 
                              a parameter and it's state is set as true. 

 componentWillMount() = This method executed after all the elements of the page is rendered correctly, this method is called. 
                         After the markup is set on the page, this technique called by React itself to either 
                         fetch the data from An External API or perform some unique operations which need the JSX elements.
                         We do not want to stay in the login page if we are already loggedIn. So add this.Auth.loggedIn in 
                         componentWillMount method hook to prevent it.

 render () =  render() is the method for any React powered component which returns a JSX with backend data. 
                It is seen as a normal method but render() method has to return something whether it is null. 
                When the component file is called it calls the render() method by default because that component needs to 
                display the HTML markup or we can say JSX syntax.

 handleFormSubmit(e) = This method is made by developer for handling the form submit as it accepts (e) event in the parameter. 
                        In this method we are calling login method that we created in the Auth service. 
                        If we are successfully logged in we are redirect to home page which we will protect with our higher order component later.
                        and this method is bind in the constructor


 handleChange(e) = This method sets the input values to state of componentand it takes value as event(e) in the parameter and it is bind in the 
                     constructor and initially the state is set as false and when it gets true then its state is set by setState method inside the 
                     handelChange method and its value is changes as the given value .


*/