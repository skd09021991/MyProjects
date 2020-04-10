import React, { Component } from 'react';
import axios from 'axios';
import './SearchResult.scss'
import AppHeader from '../AppHeader/AppHeader';
import AppFooter from '../AppFooter/AppFooter';
import Slider from 'react-slick';
//json blobs
// dryer    https : //jsonblob.com/api/07f4be7c-33a2-11ea-ae1a-51faa07fd8ad/
//dell ssd  https : //jsonblob.com/api/54eb2d63-3173-11ea-b010-4db96f7a3de3/

class SearchResult extends Component{
    state  =  {
        ecomm_items : [],
        ads         : [],
        related     : []
    }
    componentDidMount( ){
        axios.get( "https://jsonblob.com/api/07f4be7c-33a2-11ea-ae1a-51faa07fd8ad/")
        .then( response  => {
            this.setState( { 
                keywords    :  response.data.Keywords,
                ecomm_items :  response.data.ecomm_items,
                ads         :  response.data.ads,
                related     :  response.data.related
                }
            )
        })
        .catch( err  => {
            console.log( err)
        })
    }
    render( ){

        var settings   =   {
            infinite        : false,
            speed           : 500,
            adaptiveHeight  : false,
            slidesToShow    : 4,
            slidesToScroll  : 4,
            arrows          : true,
          };
        return( 
            <div className  =  'search-result'>

                <div className  =  'Header'>
                    <AppHeader/>
                </div>
                <div className  =  'smart-search' >
                <div className  =  'parent-box'  >
                        <div className  =  'bing-search-result' >
                            <div className  =  'bing-search-url'>
                                <div className  =  'add-privacy' > 
                                Results By Microsoft 
                                <a href  =  'href  =  "https : //privacy.microsoft.com/en-us/privacystatement' target = '_blank' rel = "noopener noreferrer" >( Privacy)</a>
                            </div>
                            {
                                this.state.ads.map(  items   => {
                                    if(  items.SiteLinks ){
                                        return( 
                                            <div key = { this.state.ads.indexOf(items) }  className  =  'bing-search-result-cards' >
                                                <div >
                                                    <a href  =   { items.TargetedUrl } rel = "noopener noreferrer" > { items.Title } </a> 
                                                    <span className  =  'display-url' >
                                                        <i>Ad</i>
                                                        <span className  =  'dot'>.</span>
                                                        { items.DisplayUrl }
                                                    </span>
                                                    {
                                                        items.MerchantRatings && 
                                                        <div className  =  'ratings-cover' >
                                                            <span className  =  'rating' >{ items.MerchantRatings.StarRating  }</span>
                                                            <img className  =  'stars' src  =  { items.MerchantRatings.StarRatingUrl } alt  =  '' />
                                                            <span className  =  'reviews' > { items.MerchantRatings.NumberOfReviews + ' reviews' } </span>
                                                        </div>
                                                    }
                                                    <p> { items.Description } </p>
                                                    <img src  =  { items.PixelUrl } alt  =  ''></img>
                                                    <ul className  =  'sitelinks'>
                                                        {
                                                            items.SiteLinks.map(  sitelink   => {
                                                                return( 
                                                                    <li key = { items.SiteLinks.indexOf(sitelink) } > 
                                                                        <a href  =   { sitelink.TargetedUrl } rel = "noopener noreferrer" > { sitelink.Text } 
                                                                        </a>  
                                                                        <img src  =   { sitelink.PixelUrl } alt  =  ''></img>
                                                                    </li>
                                                                )
                                                            })
                                                        }
                                                    </ul>
                                                    <div style  =  {{ clear : 'both'}} > </div>
                                                </div>
                                            </div>
                                        )
                                    }else return 0;
                                })
                            }
                            </div>
                            <div className  =  'search-result-images'>
                                <h4>Images for { this.state.keywords } </h4>
                                <Slider {...settings}>
                                    {
                                        this.state.ecomm_items.map( items  => {
                                            return( 
                                                <img key = { this.state.ecomm_items.indexOf(items) } style  =  {{ height : '60px'}} href  =  { items.item_url } alt  =  '' src  =  { items.img_url } ></img>
                                            )
                                        })
                                    }
                                </Slider>
                            </div>

                        </div>
                        {
                            this.state.ecomm_items.map( item  => {
        
                                return( 
                                    // result-list
                                <div key = { this.state.ecomm_items.indexOf(item)}  className  =  'ecomm-items-card'>    
                                        <div className  =  'items-discription'>
                                            <a className  =  'items-title-link' 
                                                href   =  {item.item_url}
                                                target =  "_blank" 
                                                rel    =  "noopener noreferrer"
                                                >
                                                {item.title.slice( 0,100)+' ...'}
                                            </a>
                                            <span className  =  'item-url' >{ item.item_url.slice( 0,32)+' ...'}</span>
                                        </div>
    
                                        <div className  =  'price-block' >
                                            <p>
                                                <span>{item.discount_percent+'%' }  </span>
                                                <span> Cashback </span>
                                            </p>
                                            <h2>
                                                <span> { '$' + item.final_price } </span>
                                                <span> { '$' + item.list_price } </span>
                                            </h2>
                                        </div>
                                    </div>    
                                )
                            })
                        }
                    </div>
                
                    <div className  =  'search-result-ads-right' >
                        <div className  =  'bing-search-result' >
                            {   
                                this.state.ads.map( items  => {
                                    if(  !items.SiteLinks ){
                                        return( 
                                            <div key = {this.state.ads.indexOf(items)} className  =  'bing-search-result-card' >
                                                <a href  =   { items.TargetedUrl } rel = "noopener noreferrer" > { items.Title } </a>
                                                <span className  =  'display-url' >
                                                    <i>Ad</i>
                                                    <span className  =  'dot' >.</span>
                                                    { items.DisplayUrl }
                                                </span>
                                                <p> { items.Description } </p>
                                                <img src  =  { items.PixelUrl } alt  =  '' ></img>
                                            </div>
                                        )
                                    }else return 0;
                                })
                            }
                        </div>
                        <div className  =  'related-searches'>
                            <ul>
                                <h2>Related Searches : </h2>
                                {
                                    this.state.related.map(  item  => {
                                        return <li key = {this.state.related.indexOf(item)} ><a href  =  '#' target  =  "_blank" rel  =  "noopener noreferrer">{ item }</a>  </li>
                                    })
                                }
                            </ul>
                        </div> 
                    </div>
                
                    <div style  =  {{ clear : 'both'}} > </div>

                </div>
                <div className  =  'PageFooter'>
                    <AppFooter />
                </div>
            </div>
        )
    }
}

export default SearchResult;