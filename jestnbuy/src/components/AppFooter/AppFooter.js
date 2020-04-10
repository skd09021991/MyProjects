import React from 'react';

import FacebookIcon from '../../assets/facebook.png';
import LinkedInIcon from '../../assets/linkedin.png';
import TwitterIcon from '../../assets/twitter.png';
//import TwitterIcon from '/twitter.png';
import PlusGoogleIcon from '../../assets/plusgoogle.png';
import './AppFooter.scss';
import {Link }from 'react-router-dom';

const AppFooter  =  ()  => {
    
    return (
        <div className = 'appFooter'>
            <div className = 'Footer' >
                <div className = 'Row' > 
                    <div className = 'FooterMenu' >
                        <ul>
                            <Link to = '/'>Home</Link> 
                            <Link to = '/about'>About us</Link> 
                            <Link to = '/category'>Blog</Link> 
                            <Link to = '/contact'>Contact us</Link> 
                        </ul>
                        <ul className = 'Legal' >
                            <Link to = '/privacypolicy'>Privacy Policy</Link>
                            <Link to = '/enduser'>Terms of Service</Link>
                        </ul>  
                    </div>
                    <div className = 'SocialMedia' >
                        <ul>
                            <li><a href = { process.env.REACT_APP_FACEBOOK}    target = '_blank' rel = "noopener noreferrer"  > <img src = { FacebookIcon } alt  = "" /> </a></li>
                            <li><a href = { process.env.REACT_APP_LINKEDIN}    target = '_blank' rel = "noopener noreferrer" > <img src = { LinkedInIcon } alt  = "" /> </a></li>
                            <li><a href = { process.env.REACT_APP_TWITTER }    target = '_blank' rel = "noopener noreferrer" >  <img src = { TwitterIcon } alt  = "" /> </a></li>
                            <li><a href = { process.env.REACT_APP_GOOGLE_PLUS} target = '_blank' rel = "noopener noreferrer" >  <img src = { PlusGoogleIcon } alt  = "" /> </a></li>
                            {/* <li><a href = '/' >  <img src = { process.env.PUBLIC_URL + '/twitter.png' } alt  = "" /> </a></li> */}
                        </ul>
                    </div>
                </div>
            </div>
            <div className = 'CopyRight' >
                <p>
                <span className = 'copyRightIcon' >c</span>
                <span className = 'copyRightYear' >2019</span>
                    © Orion Technologies LLC.  All rights reserved.
                </p>
            </div>
        </div>
    );
}
export default AppFooter;

