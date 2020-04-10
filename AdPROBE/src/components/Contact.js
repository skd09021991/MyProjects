import React, {Component} from 'react';
import '../scss/contact.scss';
import '../scss/content.scss';
import ReCAPTCHA from "react-google-recaptcha";
import TextField from '@material-ui/core/TextField'
import { Dialog } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faCheck } from '@fortawesome/free-solid-svg-icons'
class Contact extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
      error: { }
     
    }
    this.verifyCallback = this.verifyCallback.bind(this);
  }

  handleClose = (e) => {
    this.setState({
      open: false,
      full_name: '',
      subject: '',
      email_id: '',
      message: ''


      
    })
    this.captcha.reset();
}

  formSubmit = (e) => {
        
        e.preventDefault();
        this.handleClose();
        this.showDemoSlider();
        let data = Object.keys(this.state).reduce((acc , item) => {
          if(item !== 'error') {
            return {
              ...acc,
              [item]: this.state[item]
            }
          }
          return ""
        } , {});
        console.log(data);
        

  }
  
  inputChange = (e) => {
    const { error } = this.state;
       if( e.target.name === 'email_id'){
         if(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)){
           this.setState({
             email_id: e.target.value
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
         this.setState({
           [e.target.name]: e.target.value


         })
       }
  }
  handleInputOnBlur = (inputType) => {
    const { email_id, error } = this.state;
    if(inputType === 'email_id'){
      if(/^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/.test(email_id)) {
        console.log('email passed!')
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
  showDemoSlider = () => {
    this.setState({
    infoDialog: !this.state.infoDialog
  })
}
    render() {
      const {error , full_name , recaptchaToken , email_id , subject} = this.state;
      return (
        <div>
          
          <div className="dummy-header"></div>
          <section>
            <div className="comman-page-heading wow fadeIn">
              <h2>Contact Us</h2>  
            </div>  
          </section>

          <section>
            <div className="contact-sec-1">
              <div className="row">
                <div className="col-md-4">
                  <div className="contact-box  wow fadeInLeft">
                    <div className="contact-box-icon">
                      <i className="fa fa-phone"></i>
                    </div>
                    <div className="contact-box-content">
                      <h2>Phone Number</h2>
                      <ul>
                        <li>+8 (123) 985 789</li>
                        <li>+8 (123) 985 789</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="contact-box  wow fadeInDown">
                    <div className="contact-box-icon">
                      <i className="fa fa-envelope"></i>
                    </div>
                    <div className="contact-box-content">
                      <h2>Our Email</h2>
                      <ul>
                        <li>adprobe@contact.com</li>
                        <li>support@yoursite.com</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="contact-box wow fadeInRight">
                    <div className="contact-box-icon">
                    <i className="fa fa-map-marker"></i>
                    </div>
                    <div className="contact-box-content">
                      <h2>Our Address</h2>
                      <ul>
                        <li>Level 14, 388 George Street </li>
                        <li>New York 200</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>



          <section>
            <div className="contact-form">
              <h2>Send Message</h2>
              <div className="form">
                {<form >
                  <div className="row">
                    <div  className="col-md-4">
                      <div onBlur={() => this.handleInputOnBlur('full_name')} className="textInput">
                      <TextField 
                      className="textField"
                      type="text" 
                      style={{backgroundColor: 'white' , maxWidth: '297px'}}
                      variant='outlined'
                      name="full_name" 
                      onChange={this.inputChange} 
                      placeholder="Enter Full Name"
                      value={this.state.full_name || ''} 
                      error={error.full_name}
                        //id="outlined-error-helper-text"
                        helperText={error.full_name && 'Field cannot be empty'}
                      />
                      </div>
                      
                    </div>


                    <div className="col-md-4">
                      <div onBlur={() => this.handleInputOnBlur('subject')} className="textInput">
                      <TextField 
                      className="textField"
                      type="text" 
                      value={this.state.subject || ''} 
                      variant='outlined'
                      onChange={this.inputChange} 
                      name="subject" 
                      placeholder="Subject" 
                      error={error.subject}
                        //id="outlined-error-helper-text"
                        helperText={error.subject && 'Field cannot be empty'}
                      />
                      </div>
                      
                    </div>


                    <div   className="col-md-4">
                      <div onBlur={() => this.handleInputOnBlur('email_id')} className="textInput">
                      <TextField 
                      className="textField"
                      type="email" 
                      
                      variant='outlined'
                      onChange={this.inputChange} 
                      name="email_id" 
                      value={this.state.email_id || ''} 
                      error={error.email_id}
                      //id="outlined-error-helper-text"
                      helperText={error.email_id ? this.state.email_id ? 'Enter a valid email' : 'Field cannot be empty' : ''  }
                      placeholder="Enter Email" />
                      </div>
                      
                    </div>


                    <div className="col-md-12">
                      <textarea 
                      name="message" 
                      value={this.state.message} 
                      onChange={this.inputChange} 
                      placeholder="Write your message"
                      
                      >
                        
                      </textarea>
                    </div>


                    <div className="col-md-4">
                      <div className="recaptcha">
                      <ReCAPTCHA
                      className="textField"
                      ref={(r) => this.captcha = r}
                      sitekey="6LddM9gUAAAAAEaWINlCzY2fy5qbR_LNzMnjm8DA"
                      onChange={this.verifyCallback}        

                     /> 
                      </div>
                    
                    </div>


                    <div className="submit-btn">
                      <button 
                      onClick={this.formSubmit}
                      disabled={!full_name || !email_id || !recaptchaToken || !subject} 
                      className="btn">
                        Send Message
                        </button>
                    </div>
                  </div>

                  
                </form>}
              </div>
            </div>
          </section>
          <section>
            <div className="map">
            <iframe title="myFrame" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.141534467507!2d77.63870931534748!3d12.962793818577586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1541a2ec9339%3A0xcdad22f2e9639bb6!2sIntelliApt%20Technologies!5e0!3m2!1sen!2sin!4v1580737858114!5m2!1sen!2sin"  frameBorder="0" allowFullScreen={false}></iframe>
            </div>
          </section>
          {this.state.infoDialog && <Dialog
              
              open={this.state.infoDialog}
              onClose={this.showDemoSlider}
              className="demoDialog"
             >
               <div className="toggleMsg">
               <div className="msgContent">
            <div >
          <FontAwesomeIcon className="icon" style={{textAlign: 'center'}}   icon={faCheck}/>   
          </div> 
          <h1>Form Submitted</h1>
          <p>Thank you for your visit</p>
         
          </div>
               </div>
       </Dialog>}
        </div>
      )
    }
  }
  
  
  export default Contact;
  
