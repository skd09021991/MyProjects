import React from 'react';

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import  './TopPicks.scss';


const TopPicks  = (props)  =>{

    let productList  =  props.productList;
    //console.log(productList)
    let scrollHorizontalLeft =  ()  => {
        //let maxLeft  =  document.getElementById( props.title ).offsetWidth;
        let containerWidth  =  document.getElementById('imageContainer').offsetWidth;
        let shift  =  parseInt(containerWidth/2);
        let currentLeft  =  document.getElementById( props.title ).style.left;
        currentLeft  =  parseInt(currentLeft.slice(0, currentLeft.length-2 ));
        //let diff  =  currentLeft  +  maxLeft;
        if( currentLeft !==  0 ){
            currentLeft  =  currentLeft  +  shift;
            document.getElementById( props.title ).style.left  =  currentLeft + 'px';
            //console.log(shift,diff)
            //console.log('currentleft:\t' + currentLeft ,'\n\tmaxleft:\t' + maxLeft,'\n\tcontainerwidth:\t' + containerWidth);
        }
    }
    let scrollHorizontalRight =  ()  => {
        let maxLeft  =  document.getElementById( props.title ).offsetWidth;
        let containerWidth  =  document.getElementById('imageContainer').offsetWidth;
        let shift  =  parseInt(containerWidth/2);
        let currentLeft  =  document.getElementById( props.title ).style.left;
        currentLeft  =  parseInt(currentLeft.slice(0, currentLeft.length-2 ));
        currentLeft  =  currentLeft - shift;
        //let diff  =  currentLeft  +  maxLeft;
        if( (maxLeft  +  currentLeft) >=  containerWidth/2 ){
            document.getElementById( props.title ).style.left  =  currentLeft + 'px';
            //console.log(shift,diff)
            //console.log('currentleft:\t' + currentLeft,'\nmaxleft:\t' + maxLeft + '\ncontainerwidth:\t' + containerWidth)
        }
        //console.log(maxLeft  +  currentLeft)
    }
    return (
        <div className = 'top-picks'>
            <p className = 'title'>Top picks from
                <span> </span>
                <a href = { props.href } target = '_blank' rel = "noopener noreferrer" >{ props.title }</a>
            </p>
            <div className = 'Container'>
                <div className = 'arrowLeft'   >
                    <ArrowForwardIosIcon className = 'Icon' onClick =  { scrollHorizontalLeft  } />
                </div>
                <div className = 'ImageContainer' id = 'imageContainer'>
                    <div className = 'ScrollPane' id = { props.title } style = {{ left : '0px' }} >
                        {
                            productList.map( item  => {
                            return(
                                <div key = {item.product_url /* replace it with unique key for eg. item_id which will be unique for all items */ } 
                                    className = 'prodList' id = 'prodList'>
                                    <a href = { item.product_url } target = "_blank" rel = "noopener noreferrer">
                                        <img src = { item.image } alt = '' />
                                    </a>
                                    {
                                        typeof(item.discount_percent) !==  'undefined' &&  <p> { item.discount_percent  +  '%' }</p>
                                    }
                                </div>
                                );
                            })
                        }
                    </div>
                </div>                
                <div className = 'arrowRight'  >
                    <ArrowForwardIosIcon className = 'Icon' onClick =  { scrollHorizontalRight } />
                </div>
            </div>
        </div>
    )
}
export default TopPicks;
