import React, { Component } from 'react';
import ContactImg from '../../assets/contact-img.jpg';
import At_symbol from '../../assets/at_symbol.jpg';
import PhoneIcon from '../../assets/phone.jpg';
import ReCAPTCHA from "react-google-recaptcha";
import './ContactUs.scss';
import AppHeader from '../AppHeader/AppHeader';
import AppFooter from '../AppFooter/AppFooter';
import LocationIcon from '../../assets/location.jpg'
import axios from 'axios';
// import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser'; 


class ContactUs extends Component {

    state = {
        fullName        : '',
        email           : '',
        message         : '',
        recaptchaToken  : '',
        submitResponse  : '',
    }

    verifyCallback = (recaptchaToken) =>  {
        this.setState({
            recaptchaToken : recaptchaToken
        })
    }

    changeHandler = (event) => {
        this.setState({ 
                [event.target.name] : event.target.value 
        })
        // console.log(this.state)
    }
    
    contactSubmitHandler = (event) => {
        
        event.preventDefault();
        let contactFormVal = {
            fullName        : this.state.fullName,
            email           : this.state.email,
            message         : this.state.message,
            recaptchaToken  : this.state.recaptchaToken
        }
        // this.setState( { submitResponse : "Thank you for the query. We'll get back to you shortly" } )
        console.log( contactFormVal )

        axios.post( process.env.REACT_APP_CONTACT_FORM_ENDPOINT , contactFormVal )
        .then( resp =>{
            if (resp.status === 200 )
            this.setState( { submitResponse : "Thank you for the query. We'll get back to you shortly" } )
        })
        .catch(err => {
            this.setState( { submitResponse : "Ubable to submit" } )
        })
        
    }

    render(){
        let recaptcha;
        let button;

        if ( process.env.REACT_APP_MODE === 'production' ||  process.env.REACT_APP_MODE === 'staging' ){
            // console.log( 'it is production made', process.env.REACT_APP_MODE )
            button  =  (<button type = 'submit' style = {{ backgroundColor : '#b8b8be!important' }} disabled > Submit </button>)
            if( this.state.recaptchaToken){
                button =  (<button type = 'submit' style = {{ backgroundColor : '#f6af2e' }} > Submit </button>)
            }
            
            recaptcha = <ReCAPTCHA sitekey = "6Lc57sMUAAAAAEpCDQ-UFqwaOlgNIpLLbF1VNZ_2" onChange = { this.verifyCallback } />
        }
        else{
            button = (<button type = 'submit' style = {{ backgroundColor : '#f6af2e' }} > Submit </button>)
        }
        // console.log( process.env.REACT_APP_MODE )
    

        return(
             
            <div className = 'contact-us' >
                <div className = 'Header'>
                    <AppHeader/>
                </div>
                <div className = 'map-section' >
                <div className = 'address-card' >
                <div className = 'contact-card'  >
                    <h2>Contact Address</h2>
                    <li>
                        <div className = 'address' >
                            <p>
                            347 Fifth Avenue<br></br>
                            Suite 1402-369 <br></br>
                            New York, NY 10016<br></br>
                            {/* provide href value as google map location of jetset buy */}
                            <a href ={ process.env.REACT_APP_MAP_LOCATION } target='_blank' rel = "noopener noreferrer" >View larger map</a>
                            <img src = {LocationIcon} alt = ''></img>
                            </p>
                        </div>
                    </li>
                    <li>
                        <div className = 'address' >
                            <img src = {At_symbol} alt = '' ></img>
                            <a href = '#' rel = "noopener noreferrer">support@cashnsave.com</a>
                        </div>  
                    </li>
                    <li>
                        <div className = 'address' >
                            <img src = {PhoneIcon} alt = '' ></img>
                            <a href = '' rel = "noopener noreferrer" >+1 646 513-4171</a>
                        </div>
                        
                    </li>
                </div>
                </div>
                <div className = "mapouter">
                    <div className = "gmap_canvas">
                    <iframe title = {'location'} width = "100%" height = "300" frameBorder = "0" scrolling = "no" marginHeight = "0" marginWidth = "-100" src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d267.1664328172198!2d-73.98463753344012!3d40.74787724896073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b545beef%3A0x863a099016c57c2d!2sCashNsave!5e0!3m2!1sen!2sin!4v1496048899726"></iframe>
                            </div>
                        </div>
                </div>
                <div className = 'contact-cover' >
                    <div className = 'contact' >
                        <div className = 'contact-form' >
                            <h2>Contact Us</h2>
                            <form className = 'form'  id = 'form'  onSubmit = { this.contactSubmitHandler } method = 'POST' action = '/login/'   >
                                <div className = 'row' >
                                    <input type = 'text' id = 'fullName' name = 'fullName' placeholder = 'FullName' required  onChange = { this.changeHandler } value =  { this.state.fullName }/>
                                    <input type = 'email' id = 'email' name = 'email' placeholder = 'Email' required onChange = { this.changeHandler } value =  { this.state.email }/>
                                    <textarea rows = '4' id = 'message' cols = '50' name = 'message' placeholder = 'Message' required onChange = { this.changeHandler } value =  { this.state.message }/>
                                    
                                    {/* <ReCAPTCHA sitekey = "6Lc57sMUAAAAAEpCDQ-UFqwaOlgNIpLLbF1VNZ_2" onChange = { this.verifyCallback } /> */}
                                    { recaptcha }
                                    <div style = {{ height : 'fit-content'}}>
                                    { button }
                                    <div className = 'success' > { this.state.submitResponse }</div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className = 'contact-img' >
                            <img src = { ContactImg }  alt = ''></img>
                        </div>
                    </div>
                </div>
                <div className = 'PageFooter'>
                    <AppFooter />
                </div>
            </div>
        )
    }

}
export default ContactUs;
