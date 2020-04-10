import React,{Component} from 'react';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import '../scss/ScheduleDemo.scss';
import ReCAPTCHA from "react-google-recaptcha"; 
import axios from 'axios';
//import TextField from '@material-ui/core/TextField';
//import {  Divider } from 'semantic-ui-react'
//import Divider from '@material-ui/core/Divider'

class ScheduleDemo extends Component {
    constructor(props){
        super(props)
        this.state ={
            apiUrl: process.env.REACT_APP_API_ENDPOINT,
            error: {
                numLength: 13
            },
            contact_number: ''
        }
        this.verifyCallback = this.verifyCallback.bind(this);
    }


    handleChange = (e) => {
        const { error } = this.state;
        if(e.target.value && e.target.name === 'contact_number') {
            if(e.target.value.length === 1 && e.target.value.split('')[0] === '+'){
                this.setState({
                    [e.target.name]: e.target.value
                })
            } else if(e.target.value.length === 1 && /^[0-9]+$/.test(e.target.value)) {
                this.setState({
                    [e.target.name]: e.target.value,
                    error: {
                        ...error,
                        numLength: 10
                    }
                })
            }
             else if(/^[0-9]+$/.test(e.target.value.slice(1))) {
                //console.log('hi')
                this.setState({
                    [e.target.name]: e.target.value
                })
            } else {
                return
            }
        } 
        else {
            //console.log('here')
            this.setState({
                [e.target.name] : e.target.value,
                error: {
                    ...error,
                    numLength: 13
                }
            })
        }
        
    }
    
  
      
    onSubmit = (e , inputType) => {
       const { email_id, error } = this.state;
       if(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email_id)) {
        this.props.showDemoSlider();
       let data = Object.keys(this.state).reduce((acc , item) => {
           if(item !== 'error') {
            return {
                ...acc,
                [item]: this.state[item]
            }
           }
           return ""
           
       }, {});
       console.log(this.state.apiUrl)
       axios.post(this.state.apiUrl + "demo", {
        data
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
       } else {
           this.setState({
               error: {
                   ...error,
                   email_id: true
               }
           })
       }
       
    }
    handleInputOnBlur = (inputType) => {
        const { email_id, error } = this.state;
        if(inputType === 'email_id'){
          if(/^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/.test(email_id)) {
            this.setState({
              error: {
                  ...error,
                  email_id: false
                
              }
          })
          } else {
            this.setState({
              error: {
                  ...error,
                  email_id: true
                
              }
          })
          } 
        } else {
          if(!this.state[inputType]) {
            this.setState({
                error: {
                    ...this.state.error,
                    [inputType]: true
                }
            })
        }  else {
          this.setState({
            error: false
          })
        }
        } 
      
      
      
        
      
      }
    verifyCallback(recaptchaToken) {
        // Here you will get the final recaptchaToken!!!  
        this.setState({
          recaptchaToken
        })
        //console.log(recaptchaToken, "<= your recaptcha token")
      }

    

    render(){
        const {email_id , first_name , contact_number , error, recaptchaToken} = this.state;
        return(
            <div className="form">
                {<form onSubmit={this.onSubmit}>
                    <div onBlur={() => this.handleInputOnBlur('first_name')} className="textInput">
                       
                        <TextField
                         required
                        className="textField"
                        name='first_name'
                        type="text"
                        placeholder='First Name'
                        variant='outlined'
                        
                        //size='30'
                        autoFocus
                        error={error.first_name}
                        //id="outlined-error-helper-text"
                        helperText={error.first_name && 'Field cannot be empty'}
                        
                        onChange={this.handleChange}
    
                        />
                    </div>

                    <div onBlur={() => this.handleInputOnBlur('last_name')}className="textInput">
                        
                        <TextField
                         required
                        className="textField"
                        name="last_name"
                        type="text"
                        placeholder='Last Name'
                        variant='outlined'
                        error={error.last_name}
                        //id="outlined-error-helper-text"
                        helperText={error.last_name && 'Field cannot be empty'}
                      
                        //size='30'
                        onChange={this.handleChange}/>
                    </div>

                    <div onBlur={() => this.handleInputOnBlur('company_name')} className="textInput">
                       
                       <TextField
                       required
                       className="textField"
                       name="company_name"
                       type="text"
                       placeholder='Company Name'
                       error={error.company_name}
                        //id="outlined-error-helper-text"
                        helperText={error.company_name && 'Field cannot be empty'}
                        
                       
                       variant='outlined'
                       onChange={this.handleChange}/>
                     </div>

                    <div onBlur={() => this.handleInputOnBlur('email_id')} className="textInput">
                        
                        <TextField
                         required
                        className="textField"
                        name="email_id"
                        type="email"
                        
                        placeholder='example@domain.com'
                        variant='outlined'
                        
                        error={error.email_id}
                        //id="outlined-error-helper-text"
                        helperText={error.email_id ? this.state.email_id ? 'Enter a valid email' : 'Field cannot be empty' : ''  }
                        onChange={this.handleChange}/>
                    </div>
                     
                    <div className="hr-sect">Or</div>
                   

                    <div className="textInput">
                       
                        <TextField
                        className="textField"
                        name="contact_number"
                        inputProps={{
                            maxLength: error.numLength,
                            // value: contact_number
                        }}
                        placeholder='Contact Number'
                        variant='outlined'
                        value={contact_number}
                        onChange={this.handleChange}/>
                    </div>
                    <div className="textInput">
                        <div className="recaptcha">
                        <ReCAPTCHA
                        // size={window.innerWidth < 1500 ? 'compact' : 'normal'}
                      className="textField"
                      ref={(r) => this.captcha = r}
                      sitekey="6LddM9gUAAAAAEaWINlCzY2fy5qbR_LNzMnjm8DA"
                      onChange={this.verifyCallback}        

                     /> 
                        </div>
                    

                    </div>
                   
                    

                    <div>
                        <Button 
                        className="demoSubmitButton"
                        onClick={this.onSubmit} 
                        variant="contained"
                        color="primary"
                        disabled={!first_name ||  !email_id || !recaptchaToken}
                        >
                        Submit
                        </Button>
                    </div>

                </form>}
            </div>
        );
    }
}

export default ScheduleDemo;








