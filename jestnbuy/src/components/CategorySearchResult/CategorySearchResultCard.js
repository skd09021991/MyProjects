import React from 'react';
import './CategorySearchResultCard.scss';


const CategorySearchResultCard  =  (props)  => {

    return (
        <div  className = 'card animated'>
                    
        <div className = 'product-img' >
            <img src = { props.productImg }  alt = ''></img>
        </div>
        <div className = 'product-discription' >
            <h2>{ props.productTitle }</h2> 
        </div>
        <ul className = 'product-offer' >
            <li className = 'final-price' >
                <i>$  </i>
                <span>{ props.finalPrice }</span>
            </li>
            <li className = 'actual-price'  >
                <i>$  </i>
                <span> {  props.actualPrice  }  </span>
            </li>
            <li className = 'cashback-price'  >
                <span> {  props.cashbackPrice + '%' }  </span> 
                <p>Cashback</p>
            </li>
        </ul>
        <div className = 'clearfix' style = { { clear : 'both' } }  >

        </div>
        <div className = 'buy-link' >
            <a href = { props.productUrl }  target = '_blank'   rel = "noopener noreferrer">
                <img src = { props.buyLinkLogoImgSrc } alt = ''></img>
                <span>Buy Now</span>
            </a>
                
        </div>
    </div>

    );
};

export default CategorySearchResultCard;