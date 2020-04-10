import React, { Component } from 'react';
import './LazyProgressiveImageLoading.css';
import { idList, getStoredId, storeId } from './idCheck';
import { popHash, setSelfManagedId, getSelfManagedId } from './idCheck';

//==================structure of expected props and their details=====================                                              
//  srcImage            required        type:string           userdefined, valid_url, file_path             
//  placeHolderImage    optional        type:object           only expected keys 'prefix','suffix','url'                                      
//  id                  optional        type:string           userdefined,                           
//  href                optional        type:string           userdefined, valid_url,                                                 
//  alt                 optional        type:string           userdefined,                                                            
//  style               optional        type:object           userdefined, syntax should be proper                                  
//  prefix              optional        type:string           userdefined (eg. thumbnail-, thumb- etc )     must not make the new url an invalid url string                          
//  suffix              optional        type:string           userdefined (eg. -thumbnail, .thumbnail, -thumb, .thumb etc ) must not make the new url an invalid url string          
//  onClick             optional        type:function         userdefined 

// to understand the flow of this component 
/*
1. when component is used by the user the first this happens is that contructor invokes
2. in constructor an setId() invokes which introduces a new vlaue that same value is retrieved by getId() and declares id property of component
3. now render executes and all validation checks happens if all validation are not passed it throws an error else return jsx.
4. the returned jsx used this.id for image elements,
5. now after render componentDidMount() lifecycle executes and using the respective eventlistener to keeps track of situations in which
    an image can enter into the viewport and executes lazyload()
6. everytime lazyload() is called, the image element with that id is retrived and the presence is monitored with respect to the viewport,
    when it enters the view port,
        - and if element is not null and if it intersects the viewport it is loaded
        - and as each component is taking care of one image, after the image gets loaded the data-src attribute is removed, and src attribute is assigned
        - and finally in this function at the end the listeners are removed, this will optimise the performance little bit instead of not removing listeners 

*/
class LazyProgressiveImageLoading extends Component {

    constructor(props){
        super(props);
        if( ! props.srcImage) throw new Error("RequiredPropError => prop [srcImage] is required this component is strictly adhered to its props and this values,\n$from component without props srcImage " );
        if( props.id ){
            if( typeof( props.id ) !== 'string' ) throw new Error('PropsTypeError => passed prop is not string type, prop strictly required of type string,\n$from component with prop '+this.componentIdentifiedBy+'[' + props.id + "]" );
        
            if( getStoredId().indexOf( props.id ) !== -1  ) {   
                throw new Error('DuplicateIdError => Duplicate value of prop id received in LoadImageComponent, Providing duplicate is strictly restricted,\n$from component with prop '+this.componentIdentifiedBy+'[' + props.id + "]");
            }
            else{ 
                this.id = props.id ; 
                storeId( props.id );                    //  the component will be refered by is id if user provied the id, else the component will refered by the srcImage as it is cumpulsory for the user to provide
                this.componentIdentifier = this.id;     //  to dynamically change the value by prop which the component is reffered by 
                this.componentIdentifiedBy = 'id';       //  using this varibale to dynamically change the which prop the component is refered to end user when in error message
            };
        }
        else{ 
            setSelfManagedId( props.srcImage );
            this.id = getSelfManagedId( props.srcImage );
            this.componentIdentifier = props.srcImage;
            this.componentIdentifiedBy = 'srcImage';
        }
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
    // removing the id hash code from their respective storage on when component is unmounted
    componentWillUnmount(){
        if( this.props.id ){
            idList.splice( idList.indexOf( this.props.id ),1 )
        }else{
            popHash( this.props.srcImage, this.id )
        }
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
        const   expectedProps    = ['id','srcImage','onClick','href','placeHolderImage','alt','style' ];
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
    //================================ sanity checks ==========================================
        // check if we have only the expected props to work on
        //========================== expectedProps check ==============================
        passedProps.forEach( prop => {
            if( !expectedProps.includes( prop ) ){
                throw new Error('PropError => this prop "' + prop +'" is unexpected, this component is bound to have strict this.props,\n$from component with prop '+this.componentIdentifiedBy+'[' + this.componentIdentifier + ']');
            };
        });
        //========================== onClick check ==============================
        if( this.props.onClick ){  
            // onClick should be a valid function type 
            if( typeof( this.props.onClick ) !== 'function' ) throw new Error('PropsTypeError => props [onCLick] should be of type function or a reference to a function,\n$from component with prop '+this.componentIdentifiedBy+'[' + this.componentIdentifier + ']');
        };
        //========================== style check ==============================
        if( this.props.style ){ 
            // styles should be a valid object type  
            if( typeof( this.props.style ) !== 'object') throw new Error('PropsTypeError => props [style] should be of type object for applying css to the element,\n$from component with prop '+this.componentIdentifiedBy+'[' + this.componentIdentifier + ']');
        };
        //========================== alt check ==============================
        if( this.props.alt ){
            // alt image attribute type should be a string type
            if( typeof( this.props.alt ) !== 'string' ) throw new Error('PropsTypeError => prop [alt] from is not of string type, this component follows strict props and types,\n$from component with prop '+this.componentIdentifiedBy+'[' + this.componentIdentifier + ']');
        };
        //========================== href check ==============================
        if( this.props.href ){
            // href attribute of the image should be a string type and valid url
            if( typeof( this.props.href ) !== 'string' ) throw new Error('PropsTypeError => props [href] from is not of string type, this component follows strict props and types,\n$from component with prop '+this.componentIdentifiedBy+'[' + this.componentIdentifier + ']');
            if( !isValidImgResourse( this.props.srcImage ) ) throw new Error('PropsValueError => prop [href] value is not valid url,\n$from component with prop '+this.componentIdentifiedBy+'[' + this.componentIdentifier + ']');
        };
        //========================== srcImage check ==============================
        if( !this.props.srcImage ) {
            throw new Error('PropsNotSetError => prop [srcImage] not passed,strictly require this prop with unique values for everytime use of this component,\n$from component with prop '+this.componentIdentifiedBy+'[' + this.componentIdentifier + ']');
        }
        else{
            if( !isValidImgResourse( this.props.srcImage ) ) throw new Error('PropsValueError => prop [srcImage] value is not valid url or file,\n$from component with prop '+this.componentIdentifiedBy+'[' + this.componentIdentifier + ']');
        };
         //========================== srcImage check ==============================
        // if placeholderImage prop is provided, and applying all validation and checks
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
            //checking the type of placeholder, it must be object type 
            if( typeof( this.props.placeHolderImage ) !== 'object') throw new Error("PropsTypeError => props [placeHolderImage] type is not object,\n$from component with prop '+this.componentIdentifiedBy+'["+this.componentIdentifier+"]");           
            // if this props is present its length should not be zero
            if( placeHolderImageKeys.length === 0 ){
                throw new Error("PropValueError => props [placeHolderImage] does not contain any key, if this prop is used it must have atleast one of the predefined key ie. prefix, suffix,prefix and suffix,url,\n$from component with prop '+this.componentIdentifiedBy+'["+this.componentIdentifier+"]");
            }
            else{
                placeHolderImageKeys.forEach( key => {
                    if( !expectedKeys.includes( key )){
                        throw new Error('KeyError => props [placeHolderImage] containes unexpected key "'+ key +'", this component is bound to have strict props,\n$from component with prop '+this.componentIdentifiedBy+'[' + this.componentIdentifier + "]");
                    };
                });
            };
            if( this.props.placeHolderImage.prefix ){
                if( typeof( this.props.placeHolderImage.prefix ) !== 'string') throw new Error("PropsTypeError => props [placeHolderImage.prefix] type is not string,\n$from component with prop '+this.componentIdentifiedBy+'["+this.componentIdentifier+"]");
            };
            if( this.props.placeHolderImage.suffix ){
                if( typeof( this.props.placeHolderImage.suffix ) !== 'string') throw new Error("PropsTypeError => props [placeHolderImage.suffix] type is not string,\n$from component with prop '+this.componentIdentifiedBy+'["+this.componentIdentifier+"]");
            };
            if( this.props.placeHolderImage.url ){
                if( typeof( this.props.placeHolderImage.url ) !== 'string') throw new Error("PropsTypeError => props [placeHolderImage.url] type is not string,\n$from component with prop '+this.componentIdentifiedBy+'["+this.componentIdentifier+"]");
            };
            if( placeHolderImageKeys.indexOf('prefix') !== -1 && this.props.placeHolderImage.prefix.length === 0 ) throw new Error('PropsValueError => props [placeHolderImage.prefix] value cannot be of length 0,\n$from component with prop '+this.componentIdentifiedBy+'[' + this.componentIdentifier + "]");
            else if( placeHolderImageKeys.indexOf('suffix') !== -1 && this.props.placeHolderImage.suffix.length === 0 ) throw new Error('PropsValueError => props [placeHolderImage.suffix] value cannot be of length 0,\n$from component with prop '+this.componentIdentifiedBy+'[' + this.componentIdentifier + "]");
            else if( placeHolderImageKeys.indexOf('url') !== -1 && this.props.placeHolderImage.url.length === 0 ) throw new Error('PropsValueError => props [placeHolderImage.url] value cannot be of length 0,\n$from component with prop '+this.componentIdentifiedBy+'[' + this.componentIdentifier + "]");
            else if( ( placeHolderImageObjectLength === 2 &&  placeHolderImageKeys.indexOf('url') !== -1 ) ){
                throw new Error('PropsValueError => props [placeHolderImage] object cannot have url and other properties simultaneously, possible properties either "prefix" or "suffix" or ("prefix" and "suffix"),\n$from component with prop '+this.componentIdentifiedBy+'[' + this.componentIdentifier + "]");
            }
            else if( placeHolderImageObjectLength === 2 && this.props.placeHolderImage.prefix && this.props.placeHolderImage.suffix ){
                placeHolderImage = placeHolderImageUrl( 'prefixAndSuffix' )
            }
            else if( placeHolderImageObjectLength === 0 || placeHolderImageObjectLength > 3) {
                throw new Error('PropsValueError => prop [placeHolderImage] must have key-value pair with key prefix or suffix or both prefix and suffix or url,\n$from component with prop '+this.componentIdentifiedBy+'[' + this.componentIdentifier + ']');
            }
            else if( placeHolderImageObjectLength === 1 && this.props.placeHolderImage.prefix ){
                placeHolderImage = placeHolderImageUrl( 'prefix' )     
            }
            else if( placeHolderImageObjectLength === 1 && this.props.placeHolderImage.suffix ){
                placeHolderImage = placeHolderImageUrl( 'suffix' )
            }
            else if( placeHolderImageObjectLength === 1 && this.props.placeHolderImage.url ){
                if( this.props.srcImage === this.props.placeHolderImage.url ){
                    throw new Error('PropsValueError => prop [placeHolderImage.url] value can not be same as of srcImage,\n$from component with prop '+this.componentIdentifiedBy+'[' + this.componentIdentifier + "]");
                }
                else{
                    placeHolderImage = this.props.placeHolderImage.url;
                };
            };
            //if( !isValidImgResourse(this.props.placeHolderImage) ) throw new Error('PropsValueError => prop [placeHolderImage] value is not valid url or file'+'from component with prop '+this.componentIdentifiedBy+'[' + this.id + ']')
            if( this.props.srcImage === this.props.placeHolderImage ) throw new Error('PropsValueError => prop [placeHolderImage] value is same as srcImage, placeHolderImage must be different then srcImage,\n$from component with prop '+this.componentIdentifiedBy+'[' + this.componentIdentifier + "]");   
            if( !isValidImgResourse( placeHolderImage ) ) throw new Error('PropsValueError => prop [placeHolderImage] value is not valid image resourse/url/uri,\n$from component with prop '+this.componentIdentifiedBy+'[' + this.componentIdentifier + "]");
        }     
        //Jsx for Progressive Image Loading
        if( this.props.placeHolderImage  ){
            return (
                <div  className={'Progressive-Loading'}>
                    <img className = 'originalImage' id = { 'originalImage-' + this.id }  style = { this.props.style }  real-src = { src }  alt = { altText } />
                    <a href = { this.props.href } >
                    <img className = "placeHolderImage" id = { 'placeHolderImage-' + this.id } onClick = { this.props.onClick } style = { this.props.style }  data-src = { placeHolderImage } alt = { altText } />
                    </a>
                </div>
            );
        };
        //Jsx for Simple Image Loading   
        if (  !this.props.placeHolderImage  ){
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
