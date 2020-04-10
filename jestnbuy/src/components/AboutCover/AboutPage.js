import React from 'react';

import BackgroundImage from '../../assets/about.jpg';
import AppHeader from '../AppHeader/AppHeader';
import './AboutPage.scss';
import AppFooter from '../AppFooter/AppFooter';
import AmazonImg from '../../assets/amazon-logo.jpg';
import WalmartImg from '../../assets/walmart.png';
import BestbuyImg from '../../assets/bestbuy.png';
import EbayImg from '../../assets/ebay-partner.png';


const AboutPage  =  () =>{
    console.log( process.env.REACT_APP_MODE );
    return(
        <div className = 'about-page'  >
            <div className = 'Header' >
                <AppHeader/>    
            </div>
            <div className = 'about-cover'  >
                <div className = 'about-bg' style = {{  backgroundImage:'url(' + BackgroundImage + ' )'}} >
                </div>
                <div className = 'content-cover'  >
                    
                    <div className = 'content_heading' >
                        <div className = 'about-content' >
                            <p>
                            We understand the hard work a customer puts in while Comparing costs of the same product across different
                            <br></br>
                            e-commerce platforms, weighing in all the possible discounts available. Can be really frustrating and time consuming.
                            </p>
                            <p>
                            We make it possible for the user to search for the best price of a product across different e-commerce platforms, giving the best possible offers and discounts available. A single platform to look for the best price of a given product. Wouldn’t that make life easier.
                            </p>
                        </div>
                        
                        <div className = 'about-heading'  >
                            <h2>Maximum Cashback. Maximum Savings.</h2>
                        </div>
                        
                    </div>
                    {/* <div className = 'clear' ></div> */}
                    
                    <div  className = 'partners' >
                        <h2>Our Partners</h2>
                        <div className = 'row' >
                            <div className = 'partner-cover'>
                                <div className = 'partner amazon' >
                                    <img className = 'amazon-img' src = { AmazonImg } alt = ''></img>
                                </div>
                                <div className = 'partner walmart' >
                                    <img src = { WalmartImg } alt = ''></img>
                                </div>
                                <div className = 'partner bestbuy' >
                                    <img src = { BestbuyImg } alt = ''></img>
                                </div>
                                <div className = 'partner ebay' >
                                    <img src = { EbayImg } alt = ''></img>
                                </div>
                            </div>
                            <div className = 'clear' style = {{ clear:'both'}} ></div>
                        </div>
                    </div>
                    
                           
                </div>
            </div>
        
            <div className = 'PageFooter'>
                <AppFooter />
            </div>
        </div>
    )
}



export default AboutPage;