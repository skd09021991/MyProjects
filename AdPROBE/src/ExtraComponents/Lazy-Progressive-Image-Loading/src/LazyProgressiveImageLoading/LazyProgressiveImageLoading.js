import React, { Component } from 'react';
import './LazyProgressiveImageLoading.scss';
import { setId, getId } from './idProvider';

//==================structure of expected props and their details=====================                                              
//  srcImage            required        type:string           userdefined, valid_url, file_path                                       
//  href                optional        type:string           userdefined, valid_url,                                                 
//  alt                 optional        type:string           userdefined,                                                            
//  placeHolderImage    optional        type:object           only expected keys 'prefix','suffix','url'                                      
//  style               optional        type:object           userdefined, syntax should be proper                                  
//  prefix              optional        type:string           userdefined (eg. thumbnail-, thumb- etc )     must not make the new url an invalid url string                          
//  suffix              optional        type:string           userdefined (eg. -thumbnail, .thumbnail, -thumb, .thumb etc ) must not make the new url an invalid url string          
//  onClick             optional        type:function         userdefined 

class LazyProgressiveImageLoading extends Component {

    constructor(props){
        super(props);
        setId();
        this.id = getId();
    }
    componentDidMount(){
        /*these listeners are added here in componentDidMount because this lifecycle runs after the render function 
        and in the lazyload() we find the element and check if it is in viewport or not and we successfully get the element at this stage 
        and if these listeneres added in render function, in your first render you will get element not found as listeners will be invoked 
        before the jsx is returned.*/

        /*implelmented these many listeners present below and stages to make sure your check on elements presence is occurs
        leaving no chase of assigning data-src value to src */
        if( document.readyState === 'complete' || 'interactive'){
            this.lazyLoad()
        }
        document.addEventListener('DOMContentLoaded', this.lazyLoad)
        document.addEventListener("scroll", this.lazyLoad)
        window.addEventListener("resize", this.lazyLoad)
        window.addEventListener("orientationchange", this.lazyLoad)
    }
    //on the added listeners checking on element if entered into the viewport 
    lazyLoad = () => {

        let elementImage = document.getElementById('placeHolderImage-' + this.id );  

        if( elementImage != null) {
            //set timeout function is set to delay the processing for functionality of lazy load so that rest of the static files get downloaded efficiently,
            setTimeout( () => {
                //The Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
                //The read-only innerHeight property of the Window interface returns the interior height of the window in pixels, including the height of the horizontal scroll bar, if present.
                /*  The Window.getComputedStyle() method returns an object containing the values of all CSS properties of an element, after applying active stylesheets and resolving any basic computation those values may contain. 
                    Individual CSS property values are accessed through APIs provided by the object, or by indexing with CSS property names.
                    */
                if( ( elementImage.getBoundingClientRect().top <= window.innerHeight + 200 && elementImage.getBoundingClientRect().bottom >= -200 ) && window.getComputedStyle(elementImage).display  !== 'none'){
                    // here start logic for lazy load and dynamic class addition to achieve progressive loading.
                    const src = elementImage.getAttribute('data-src');
                    //this if condition will abort the lazy load and exit lazyLoad function if img tag already has src attribute ie. it is already downloaded and now there is no need to listen or process it for lazy-progressive-loading.
                    if( elementImage.getAttribute('src') ){
                        return 
                    };
    
                    elementImage.onload = () => {
                        //this try will throw error when usel want image to load simply not pregressively, this will throw error and 
                        try{
                            const image = document.getElementById( 'originalImage-' + this.id );
    
                            image.onload = () => { 
                                image.style.display = 'block';
                                elementImage.classList.add('show-original');
                                //elementImage.style.height = image.style.height;
                            };
    
                            image.src = image.getAttribute('real-src');
                            image.removeAttribute('real-src');
                        }
                        catch( err ){};
                    }
                    elementImage.src = src;
                    elementImage.removeAttribute('data-src');
    
                    document.removeEventListener('DOMContentLoaded', this.lazyLoad);
                    document.removeEventListener("scroll", this.lazyLoad);
                    window.removeEventListener("resize", this.lazyLoad);
                    window.removeEventListener("orientationchange", this.lazyLoad);
                };
            }, 200 );  
            
        }else return;
    };

    render(){   
        const   src              = this.props.srcImage;
        const   altText          = this.props.alt;
        let     placeHolderImage = this.props.placeHolderImage;  
        const   passedProps      = Object.keys( this.props );
        const   expectedProps    = ['srcImage','onClick','href','placeHolderImage','alt','style' ];
        //helper function to check if passed value of srcImage and placeHolderImage is valid url or path of image or not
        const isValidImgResourse = ( UrlOrLoc ) => {
            const validUrlRegExp                = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
            const baseVersionImageDataRegExp    = /data:image\/*/;
            const filepathRegExp                = /\b[\w]{1,25}\.+(jpg|gif|png|icon|jpeg|ico|webp|svg|tif)$/i;
            if( validUrlRegExp.test( UrlOrLoc ) || filepathRegExp.test( UrlOrLoc ) || baseVersionImageDataRegExp.test( UrlOrLoc ))
                return true;
            else
                return false;
        };
    //================================sanity checks==========================================
        // check if we have only the expected props to work on
        passedProps.forEach( prop => {
            if( !expectedProps.includes( prop ) ){
                throw new Error('PropError => this prop "' + prop +'" is unexpected, this component is bound to have strict this.props,\n$from component with prop id[' + this.id + ']');
            };
        });

        if( this.props.onClick ){  
            // onClick should be a valid function type 
            if( typeof( this.props.onClick ) !== 'function' ) throw new Error('PropsTypeError => props [onCLick] should be of type function or a reference to a function,\n$from component with prop id[' + this.id + ']');
        };

        if( this.props.style ){ 
            // styles should be a valid object type  
            if( typeof( this.props.style ) !== 'object') throw new Error('PropsTypeError => props [style] should be of type object for applying css to the element,\n$from component with prop id[' + this.id + ']');
        };

        if( this.props.alt ){
            // alt image attribute type should be a string type
            if( typeof( this.props.alt ) !== 'string' ) throw new Error('PropsTypeError => prop [alt] from is not of string type, this component follows strict props and types,\n$from component with prop id[' + this.id + ']');
        };

        if( this.props.href ){
            // href attribute of the image should be a string type
            if( typeof( this.props.href ) !== 'string' ) throw new Error('PropsTypeError => props [href] from is not of string type, this component follows strict props and types,\n$from component with prop id[' + this.id + ']');
        };
        //==========================srcImage check==============================
        if( !this.props.srcImage ) {
            throw new Error('PropsNotSetError => prop [srcImage] not passed,strictly require this prop with unique values for everytime use of this component,\n$from component with prop id[' + this.id + ']');
        }
        else{
            if( !isValidImgResourse( this.props.srcImage ) ) throw new Error('PropsValueError => prop [srcImage] value is not valid url or file,\n$from component with prop id[' + this.id + ']');
        };
        
        if( this.props.placeHolderImage ){   
            const expectedKeys                  = [ 'prefix','suffix','url' ];
            const placeHolderImageKeys          = Object.keys( this.props.placeHolderImage );
            const placeHolderImageObjectLength  = placeHolderImageKeys.length;
            //helper function to return url for placeHolderImage using srcImage prop value dynamically depending upon 
            //key passed in placeHolderImage prop ie 'prefix','suffix','url'
            const placeHolderImageUrl = ( editWith ) => {
                const imageUrl      = src;
                const path          = imageUrl.substring( 0, imageUrl.lastIndexOf('/') + 1 );   //path or directory of image file/url/uri
                const fileAndParams = imageUrl.substring( imageUrl.lastIndexOf('/') + 1 );      //substring after the path, beginning/including file name
                const file          = fileAndParams.substring( 0, fileAndParams.indexOf('.') ); //name of file without .ext
                const extAndParams  = fileAndParams.substring( fileAndParams.indexOf('.') );    //including rest part starting from  .ext......
                switch(editWith){
                    case 'prefix':
                        return path + this.props.placeHolderImage.prefix + fileAndParams;
                    case 'suffix':
                        return path + file + this.props.placeHolderImage.suffix + extAndParams;
                    case 'prefixAndSuffix':
                        return path + this.props.placeHolderImage.prefix + file + this.props.placeHolderImage.suffix + extAndParams;
                    default:
                        throw new Error('InvalidArgument => Invalid argument passes for while placeHolderImageUrl, required argument is one of "prefix","suffix" or "prefixAndSuffix"' );
                }
            }               
            if( typeof( this.props.placeHolderImage ) !== 'object') throw new Error("PropsTypeError => props [placeHolderImage] type is not object,\n$from component with prop id["+this.id+"]");           
            if( placeHolderImageKeys.length === 0 ){
                throw new Error("PropValueError => props [placeHolderImage] does not contain any key, if this prop is used it must have atleast one of the predefined key ie. prefix, suffix,prefix and suffix,url,\n$from component with prop id["+this.id+"]");
            }
            else{
                placeHolderImageKeys.forEach( key => {
                    if( !expectedKeys.includes( key )){
                        throw new Error('props [placeHolderImage] containes unexpected key "'+ key +'", this component is bound to have strict props,\n$from component with prop id[' + this.id + "]");
                    };
                });
            };
            if( this.props.placeHolderImage.prefix ){
                if( typeof( this.props.placeHolderImage.prefix ) !== 'string') throw new Error("PropsTypeError => props [placeHolderImage.prefix] type is not string,\n$from component with prop id["+this.id+"]");
            };
            if( this.props.placeHolderImage.suffix ){
                if( typeof( this.props.placeHolderImage.suffix ) !== 'string') throw new Error("PropsTypeError => props [placeHolderImage.suffix] type is not string,\n$from component with prop id["+this.id+"]");
            };
            if( this.props.placeHolderImage.url ){
                if( typeof( this.props.placeHolderImage.url ) !== 'string') throw new Error("PropsTypeError => props [placeHolderImage.url] type is not string,\n$from component with prop id["+this.id+"]");
            };
            if( placeHolderImageKeys.indexOf('prefix') !== -1 && this.props.placeHolderImage.prefix.length === 0 ) throw new Error('PropsValueError => props [placeHolderImage.prefix] value cannot be of length 0,\n$from component with prop id[' + this.id + "]");
            else if( placeHolderImageKeys.indexOf('suffix') !== -1 && this.props.placeHolderImage.suffix.length === 0 ) throw new Error('PropsValueError => props [placeHolderImage.suffix] value cannot be of length 0,\n$from component with prop id[' + this.id + "]");
            else if( placeHolderImageKeys.indexOf('url') !== -1 && this.props.placeHolderImage.url.length === 0 ) throw new Error('PropsValueError => props [placeHolderImage.url] value cannot be of length 0,\n$from component with prop id[' + this.id + "]");
            else if( ( placeHolderImageObjectLength === 2 &&  placeHolderImageKeys.indexOf('url') !== -1 ) ){
                throw new Error('PropsValueError => props [placeHolderImage] object cannot have url and other properties simultaneously, possible properties either "prefix" or "suffix" or ("prefix" and "suffix"),\n$from component with prop id[' + this.id + "]");
            }
            else if( placeHolderImageObjectLength === 2 && this.props.placeHolderImage.prefix && this.props.placeHolderImage.suffix ){
                placeHolderImage = placeHolderImageUrl( 'prefixAndSuffix' )
            }
            else if( placeHolderImageObjectLength === 0 || placeHolderImageObjectLength > 3) {
                throw new Error('PropsValueError => prop [placeHolderImage] must have key-value pair with key prefix or suffix or both prefix and suffix or url,\n$from component with prop id[' + this.id + ']');
            }
            else if( placeHolderImageObjectLength === 1 && this.props.placeHolderImage.prefix ){
                placeHolderImage = placeHolderImageUrl( 'prefix' )     
            }
            else if( placeHolderImageObjectLength === 1 && this.props.placeHolderImage.suffix ){
                placeHolderImage = placeHolderImageUrl( 'suffix' )
            }
            else if( placeHolderImageObjectLength === 1 && this.props.placeHolderImage.url ){
                if( this.props.srcImage === this.props.placeHolderImage.url ){
                    throw new Error('PropsValueError => prop [placeHolderImage.url] value can not be same as of srcImage,\n$from component with prop id[' + this.id + "]");
                }
                else{
                    placeHolderImage = this.props.placeHolderImage.url;
                };
            };
            //if( !isValidImgResourse(this.props.placeHolderImage) ) throw new Error('PropsValueError => prop [placeHolderImage] value is not valid url or file'+'from component with prop id[' + this.id + ']')
            if( this.props.srcImage === this.props.placeHolderImage ) throw new Error('PropsValueError => prop [placeHolderImage] value is same as srcImage, placeHolderImage must be different then srcImage,\n$from component with prop id[' + this.id + "]");   
            if( !isValidImgResourse( placeHolderImage ) ) throw new Error('PropsValueError => prop [placeHolderImage] value is not valid image resourse/url/uri,\n$from component with prop id[' + this.id + "]");
        }     
        //Jsx for Progressive Image Loading
        if( this.props.placeHolderImage  ){
            return (
                <div id = { 'container-' + this.id } className={'Progressive-Loading'}>
                    <img id = { 'originalImage-' + this.id }  style = { this.props.style } className = 'originalImage' real-src = { src }  alt = { altText } />
                    <a href = { this.props.href } >
                    <img id = { 'placeHolderImage-' + this.id } onClick = { this.props.onClick } style = { this.props.style } className = "placeHolderImage" data-src = { placeHolderImage } alt = { altText } />
                    </a>
                </div>
            );
        };
        //Jsx for Simple Image Loading   
        if (  !this.props.placeHolderImage && !this.props.autoThumbnail ){
            return(
                <div className = {'image-loading'}>
                    <a href = { this.props.href } >
                        <img id = { 'placeHolderImage-' + this.id } onClick = { this.props.onClick } style = { this.props.style } className = "placeHolderImage"  data-src = { src } alt = { altText } />
                    </a>
                </div>  
            );
        };
    };
};
export default LazyProgressiveImageLoading;
