import React, { useState , Component } from 'react';
//using useState and useEffect to copy use the data from json blob if serivces would have been avail. object would have been directly called. and 
//then remove the useState and useEffect Implementation resulting this turn into complete stateless component
import AppHeader from '../AppHeader/AppHeader';
import AppFooter from '../AppFooter/AppFooter';
import Category from '../Category/Category';
import WalmartIcon from '../../assets/walmart-logo.png';
import EbayIcon from '../../assets/ebay-logo.png';
import CategorySearchResultCard from './CategorySearchResultCard';
import './CategorySearchResult.scss'; 
import axios from 'axios';
// import { response } from 'express';  

// import {categorySearchResultData} from '../../services/categorySearchResult'
class CategorySearchResult extends Component {
//using data from different vendors there must be single object having data for all products
/*depending upon the vendors change the logo passed in CategorySearchResultCard component buyLinkLogoImgSrc named prop.
and logic for that vendors logo is still left to do */


    // const data  =  categorySearchResultData
    state = {
        apiResponse : [],
    }
    
    // console.log(  endpoints.map( item  =>  { return axios.get(item.endpoint) }) ) 
    componentDidMount = ()  =>  {
        let endpoints  =  [
            { 
                'provider'  : 'walmart',
                'endpoint'  : "https://jsonblob.com/api/2e495220-53be-11ea-a41b-4d7d4d2f2230",
                'logo'      : WalmartIcon,
            },
            { 
                'provider'  : 'ebay',
                'endpoint'  : "https://jsonblob.com/api/9fae8442-3641-11ea-8f9f-edf38a35c301",
                'logo'      : EbayIcon,
            }
        ]
        axios.all( endpoints.map( item  =>  { return axios.get(item.endpoint).catch(err =>{ return 0 }) }) )
        .then( axios.spread( (...responses)  => {
            let data = [];
            responses.forEach( res =>{
                if ( res.status === 200 ){
                    let index;
                    for( index = 0 ; index < endpoints.length ; index++ ){
                        if( endpoints[index].endpoint === res.config.url){
                            data.push( { "vendor" : endpoints[index].provider ,'logo' : endpoints[index].logo, 'productsList' : res.data } )
                            break
                        }
                    }
                    // endpoints.forEach( item =>{
                    //     if( item.endpoint === res.config.url ){
                    //         data.push( { "vendor" : item.provider ,'logo' : item.logo, 'productsList' : res.data }  );
                    //     }
                    // })
                }
            })
            this.setState( { apiResponse : data })
        }))
        .catch(error  =>  {
            console.log("something is wrong",error);
        });
    }
    
    render(){
        return(
            <div className = 'CategorySearchResult'>
                <div  className = 'Header' >
                    <AppHeader/>
                </div>
                <div className = 'ContentArea'>
                    <div className = 'Category' >
                        <Category/>
                    </div>
                    <div className = 'product-cards'>
                        <div className = 'display-products' >
                            {   
                                this.state.apiResponse.map(items  =>  { 
                                    let products  =  items.productsList
                                    let buyLinkLogo  =  items.logo
    
                                    return products.map( item  =>  {
                                        return (  
                                            < CategorySearchResultCard  
                                            key             = { products.indexOf(item) }
                                            productUrl      = { item.item_url || item.product_url }
                                            productImg      = { item.img_url || item.image  } 
                                            productTitle    = { item.title } 
                                            finalPrice      = { item.final_price } 
                                            actualPrice     = { item.list_price } 
                                            cashbackPrice   = { item.discount_percent } 
                                            buyLinkLogoImgSrc = { buyLinkLogo }     
                                            />                                                         
                                        )
                                    })
                                })                        
                            }
                            
                        </div>
                    </div>
                    <div className = 'clear' style = {{ clear : 'both' } }></div>
                </div>
                <div  className = 'Footer'>
                    <AppFooter/>
                </div>
            </div>
        );
    }
}

export default CategorySearchResult;






// ebayjson
//https://jsonblob.com/56f1c299-3641-11ea-8f9f-2533ee9edbe6

//best buy      https://jsonblob.com/7d509b4e-3641-11ea-8f9f-4f7644eda24b

// ebay     https://jsonblob.com/9fae8442-3641-11ea-8f9f-edf38a35c301
