import React,{Component} from 'react';
import CookieConsent from "react-cookie-consent";
import '../scss/cookies.scss';

class Cookie extends Component {
    render() {
       
        return(
            <div>
                <div>
             <CookieConsent
                className="cookieConsent"
                //debug={true}
                style={{backgroundColor:' #f6f6fe' , margin: '0 auto'  ,display: 'inline-block' ,textAlign: 'center'}}
                buttonText ="Accept"
                flipButtons
                acceptOnScroll={true}
                enableDeclineButton
                declineButtonText="Decline"
                //declineCookieValue
                setDeclineCookie={false}
                declineButtonStyle={{borderRadius: '5px' ,  marginLeft: " 0 0 0 500px" ,marginBottom: '20px'}}
                buttonStyle={{ fontWeight: "bold" , marginBottom : '10px', backgroundColor: '#00bce3' , borderRadius: '5px' }}
                expires={30}
                
              
               >
                <p style={{color: '#21366e' ,fontFamily:"'Gilroy', sans-serif", fontSize: '16px' , maxWidth: '1005px' , textAlign: 'left' , marginTop: '10px'}}>
                This website stores cookies on your computer .These cookies are used to collect information about 
                how you interact with our webite and allow us to remember you .We use this information in order 
                to improve and customize your browsing experience and for analytics and metrics about our visitors
                both on this website and other media.To find out more about the cookies we use , see our privacy policy.</p> 

                <p style={{color: '#21366e' , fontSize: '16px' ,fontFamily:"'Gilroy', sans-serif", maxWidth: '1005px' , textAlign: 'left' }}>
                    If you decline , your information won't be tracked when you visit this website.A single cookie will be used
                in your browser to remember your preference not to be tracked.
                </p>
                </CookieConsent>
                </div>
            </div>
        );
    }
}

export default Cookie;