import React from 'react';

import './HomePage.scss';

import AppHeader from '../AppHeader/AppHeader';
import AppFooter from '..//AppFooter/AppFooter';
import Category from '../Category/Category';
import Slider from '../Slider/slider';
import TopPicks from '../TopPicks/TopPicks';


//import bestBuyRes from './services/bestbuyApiRes';

const HomePage  =  (props)  => {
    // console.log(props);
    console.log( props )
    return (
      <div className = "App">
        <div className = 'Header'>
           <AppHeader />
         </div>
         <div className = 'Slider'>
           <Slider/>
         </div>
         <div className = 'ContentArea'>
           <div className = 'Category' >
             <Category/>
           </div>
           <div className = 'TopPicks'>
             {
               props.TopPicksData &&  props.TopPicksData.map( item  => {
                 return <TopPicks key = { props.TopPicksData.indexOf(item) }  productList  =  { item.data }  title  = {  item.title }  href = {  item.url }/>
               })
             }
           </div>
           <div style = {{ clear : 'both'}} ></div>
         </div>
         <div className = 'PageFooter'>
           <AppFooter />
         </div>

      </div>
    );
  
}
export default HomePage;
