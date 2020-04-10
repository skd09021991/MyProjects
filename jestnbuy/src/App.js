import React, { Component } from 'react';
import {BrowserRouter as Router  } from 'react-router-dom';
import { Route } from 'react-router-dom';
import axios from 'axios';
import HomePage from './components/HomePage/HomePage';
import SearchResult from './components/SearchResult/SearchResult';
import CategorySearchResult from './components/CategorySearchResult/CategorySearchResult';
import AboutPage from './components/AboutCover/AboutPage';
import ContactUs from './components/ContactUs/ContactUs';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy';
import TermsAndService from './components/TermsAndService/TermsAndService';
import './App.scss';
// import { response } from 'express';


const homePageData = [
{ 
  'title' : 'Walmart',
  'url'  : 'https://www.walmart.com/',
  'api'  : 'http://cashnsave.com/fetchtopproducts/?Ecomm=walmart'
},
{ 
  'title' : 'BestBuy',
  'url'  : 'http://www.bestbuy.com/?intl=nosplash',
  'api'  : 'https://cashnsave.com/fetchtopproducts/?Ecomm=bestbuy'
},
{ 
  'title' : 'Ebay',
  'url'  : 'https://www.ebay.com/',
  'api'  : 'http://cashnsave.com/fetchtopproducts/?Ecomm=ebay'
},

]



class App extends Component {
  state ={
    BestBuyProductList :  [],
    EbayProductList :  [],
    AmazonProductList :  [],
  }
  componentDidMount () {

    axios.all( homePageData.map( item =>{ return axios.get( item.api ).catch(err =>{ return 0} ) }) )
    .then( axios.spread( (...responses ) =>{
      let data = []
      // console.log( responses.length )
      responses.forEach( res =>{ 
        if( res.status === 200 ){
          let index = 0;
          for( index = 0 ; index < homePageData.length ; index ++ ){
            if ( homePageData[index].api === res.config.url ){
              data.push( { 'title' : homePageData[index].title, 'url' : homePageData[index].url, 'data' : res.data[ homePageData[index].title.toLowerCase() ]  });
              break
            }
          }
        }
      })
      // console.log( data.length )
      this.setState( { "topPicksData"  :  data  })
      // console.log( this.state.topPicksData )
    
    }))

    

    }
  render(){
    return (
      <Router>
        <div>
          <Route exact = { true } path = "/" >
            {/* If service would have been implemented these objects would have been called from homepage itself */}
            <HomePage 
              TopPicksData = { this.state.topPicksData }            
            />
          </Route>
          <Route exact = { true } path = { "/search" }         component = { SearchResult } />
          <Route exact = { true } path = { "/about" }          component = { AboutPage } />
          <Route exact = { true } path = { "/contact" }        component = { ContactUs }/>
          <Route exact = { true } path = { "/privacypolicy" }  component = { PrivacyPolicy }/>
          <Route exact = { true } path = { "/category" }       component = { CategorySearchResult } />
          <Route exact = { true } path = { "/enduser" }        component = { TermsAndService } />
        </div>
      </Router>
      );
  }
}
export default App;
