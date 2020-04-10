# LazyProgressiveImageLoading #

[![npm Version](https://lbewagia.sirv.com/Images/reamdme-stuffs/lazyprogressiveimageloadingVersion.svg)](https://www.npmjs.com/package/lazyprogressiveiamgeloading)
---

---
This component is developed for ReactJs as solution to provide option to the user to embed image efficiently in the application which will ultimately speed up the application loading with internal implementation of Lazy Loading for simple image loading and progressive image loading, one of the milestone to use this component is that not only the original images in progressive image loading are lazily loading in fact the placeholder images are also lazily loaded.

On the basis of two props which are listed below `srcImage` and `placeHolderImage` one of the two implementations will be introduced, which are:

1. LazyLoading
    * Implemented when if you user only provided `srcImage` prop.
    * Image will be only loaded when it intercepts the viewport of the screen
2. LazyProgressiveLoading 
    * Implemented when user provides `placeHolderImage` prop along with `srcImage` as srcImage is required else error will be thrown.
    * Image will load in progressive manner only after the placeholder image intercepts the viewport of the screen, which mean LazyLoading is implemented on placeholderImage and after that srcImage loads progressively.

---  


## Importing
---
```
import LazyProgressiveLoad from ‘../LazyProgressiveImageLoading/LazyProgressiveImageLoading’;//ES6
```
---


## The Component Structure :-

This component is strictly adhered to props and its values to be passed, here is in detail about the props and their values:-


### 1. srcImage
	
    Requirement:-
        * required

    Type:-	
        * string        ( validURL, data/image:/ )
	
    Description:-
        * usage of this required prop will introduce LazyImageLoading only. 
        * this props is internally used similary as 'src' attribute used in IMG HTML tag.
    
    Constraints:-
        * it must be a valid url or base64 encoding of image and it’s length must not be zero.
    
    Raises:-
        errors:
        * PropsTypeError    : if this prop value is not string type
        * RequiredPropError : absence of this prop will throw and error. 
        * PropsValueError   : passing an invalid url or empty string value will thow an error.

    Syntax:-
    ---
        < LazyProgressiveLoad srcImage = { "https://lbewagia.sirv.com/Images/mixed/download.jpeg" } />
        
        //or
        
        import DownloadImage from '../assets/images/download.jpeg';             // importing image
        < LazyProgressiveLoad srcImage = { DownloadImage } />                   //in your jsx code inside return
    ---

    
## 2. placeHolderImage
	
    Requirement:-
        * optional

    Type:-
        * object        ( similar to style jsxAttribute for in-line styling style={{ prefix: ‘thumb-’ }} )
	
    Description:-
        * usage of this prop wil introduce LazyProgressiveImageLoading
        * if user wants the images to progressively load this prop must have atleast one of the key with only one of the Key existing rule explained above.
        * this prop has predefined keys and pre-defined rule for keys to exist.

    Constraints:-
        * this prop must be an object, with only pre-defined possible following keys
            * prefix
            * suffix
            * url
        * keys existing rules
            * prefix			only
            * suffix 			only
            * prefix and suffix
            * url				only
        * NOTE
            * no value of any key should have length zero.
            * value of url must be string and valid url        
            * value of prefix and suffix key must be a string, which doesn't result to invalid url

    Raises:-
        errors:
        * PropsTypeError    : if this value is not object type
        * PropsValueError   : if the final refered url using value of prefix,suffix value is invalid
        * PropsValueError   : if value of srcImage and placeHolderImage props are same
        * KeyError          : if unexpected props received

    Syntax:- 
    ---
        < LazyProgressiveLoad 
            srcImage            = { "https://lbewagia.sirv.com/Images/mixed/download.jpeg" } 
            placeHolderImage    = { { prefix : 'thumbnail-' } }                                                         //to reffer image - https://lbewagia.sirv.com/Images/mixed/thumbnail-download.jpeg
        />
        
        //or

        < LazyProgressiveLoad 
            srcImage            = { "https://lbewagia.sirv.com/Images/mixed/download.jpeg" } 
            placeHolderImage    = { { suffix : '-thumbnail' } }                                                        //to reffer image - https://lbewagia.sirv.com/Images/mixed/download-thumbnail.jpeg
        />

        //or

        < LazyProgressiveLoad 
            srcImage            = { "https://lbewagia.sirv.com/Images/mixed/download.jpeg" }                         
            placeHolderImage    = { { prefix : 'thumbnail-', suffix : '-thumb' } }                                     //to reffer image - https://lbewagia.sirv.com/Images/mixed/thumbnail-download-thumbnail.jpeg
        />

        //or

        < LazyProgressiveLoad 
            srcImage            = { "https://lbewagia.sirv.com/Images/mixed/download.jpeg" } 
            placeHolderImage    = { { url : "https://lbewagia.sirv.com/Images/mixed/thumbnail-download-thumb.jpg" } }  //to reffer image - https://lbewagia.sirv.com/Images/mixed/thumbnail-download-thumb.jpg
        />
    ---

    Prop Values:-

        1. prefix
	
            Requirement:-
                * optional

            Type:-
                * string        (suggested: thumbnail-, thumb- etc)
                    
            Description:-
                * if user is using hosted image through cdn or through network request option to load images.
                * the value of this prop must be of non zero length.
                * the value provided for this key in prop placeHolderImage internally get prefixed to the srcImage value which results in new url of image to be used as place-holder till the original image gets loaded.

            Contraints:-
                * NOTE:- Do not use ‘thumbnail.’ as value of prefix ie. there show noe [ . ] in the value, it may result in invalidurl
                    
        2. suffix
        
            Requirement:-
                * optional

            Type:-
                * string        (suggested: -thumbnail, -thumb etc)
                    * NOTE:- Do not use ‘thumbnail.’ as value of prefix.
            
            Description:-
                * if user is using hosted image through cdn or through network request option to load image.
                * the value of this prop must be on non zero length.
                * the value provided for this key in prop placeHolderImage internally get suffixed to the srcImage value which results in new url of image to used as place-holder till the original image gets loaded.
            Contraints:-
                * NOTE:- Do not use ‘.thumbnail’ as value of prefix ie. there show noe [ . ] in the value, it may result in invalidurl
        
        3. url
        
            Requirement:-
                * optional

            Type:-
                * string        (validUrl)
            
            Description:-
                * if user is using hosted image through cdn or through network requests wants to dedicatedly assess the url of the image resource.
                * this key will be directly assigned as the src for original image when lazily loaded.


## 3. id 

    Requirement:-
        * optional
    
    Type
        * string
    
    Description:-
        * to give id to the image tag 
        * this prop is used exactly like the id attribute in IMG HTML tag

    Raises:-
        errors:-
        * PropsTypeError    : if this prop value is not string type
        * DuplicateIdError  : if duplicate value is passed
    
    Syntax:-
    ---
        < LazyProgressiveLoad 
            srcImage = { "https://lbewagia.sirv.com/Images/mixed/download.jpeg" } 
            id       = { 'download' }   
        />
    ---


## 3. style
	
    Requirement:-
        * optional

    Type:-
        * object        ( similar to style jsxAttribute for in-line styling style={{ width : '400px' }} )
	
    Description:-
        * to give style to the img tag.
        * this prop is simply passes to the image tag and internally work exactly as style jsx attribute works in react.js.

    Raises:-
        errors:
        * PropsTypeError    : if this prop value is not object type

    Syntax:-
    ---
        < LazyProgressiveLoad 
           srcImage = { "https://lbewagia.sirv.com/Images/mixed/download.jpeg" } 
           style    = { { height : '200px', width : '400px' } }
        /> 

        //or
        
        const imgStyle = {
        width       : '400px',
        height      : '200px',
        marginTop   : '5px'
        };

        < LazyProgressiveLoad 
           srcImage = { "https://lbewagia.sirv.com/Images/mixed/download.jpeg" } 
           placeHolderImage    = { { prefix : 'thumbnail-', suffix : '-thumb' } }      
           style    = { imgStyle }
        />
    ---
    

## 4. alt

	Requirement:-
        * optional

    Type:-
        * string
	
    Description:-
        * to provide alternate text for the image, in case of any failure and image does not get loaded.
        * similar to alt attribute for img tag in jsx and html.

    Raises:-
        errors:
        * PropsTypeError    : if this prop value is not string
    
    Syntax:-
    ---
        < LazyProgressiveLoad 
           srcImage = { "https://lbewagia.sirv.com/Images/mixed/Happy-Anniversary.jpg" } 
           alt      = { 'Happy Aniversary' }
        /> 

        //or
        
        imgAlt = 'Happy Aniversary'
        < LazyProgressiveLoad 
           srcImage = { "https://lbewagia.sirv.com/Images/mixed/Happy-Anniversary.jpg" } 
           placeHolderImage    = { { prefix : 'thumbnail-' } }      
           style    = { imgAlt }
        />
    ---

## 5. href

	Requirement:-
        * optional

    Type:-
        * string 		(validUrl)
	
    Description:-
        * to make your image navigable, pass this prop with valid url.
        * Similar as href attribute for a tag in jsx and html.

    Constraints:-
        * should be a valid url

    Raises:-
        errors:
        * PropsTypeError    : if this prop value is not string
        * PropsValueError   : if this prop value is not valid url
    
    Syntax:-
    ---
        < LazyProgressiveLoad 
           srcImage = { "https://lbewagia.sirv.com/Images/mixed/Happy-Anniversary.jpg" } 
           href     = { 'Happy Aniversary' }
        /> 

        //or
        
        imgHref = 'Happy Aniversary'
        < LazyProgressiveLoad 
           srcImage             = { "https://lbewagia.sirv.com/Images/mixed/Happy-Anniversary.jpg" } 
           placeHolderImage     = { { suffix : '-thumb' } }      
           href                 = { imgHref }
        />
    ---

## 6. onClick

	Requirement:-
        * optional

	Type:-
        * function 

	Description:-
        * to make your image listen click event and execute the function.
        * similar as onClick attribute for jsx element and onclick attribute in html element.
        * the value must be the typeof a function or a function itself.
    
    Raises:-
        errors:
        * PropsTypeError    : if this prop value is not function type

    Syntax:-
    ---
        const hello = () => { console.log('hey this onClick prop is working well...... ' ); };

        < LazyProgressiveLoad 
           srcImage = { "https://lbewagia.sirv.com/Images/mixed/Happy-Anniversary.jpg" } 
           onClick  = { hello }
        /> 

        //or
        
        imgHref = 'Happy Aniversary'
        < LazyProgressiveLoad 
           srcImage             = { "https://lbewagia.sirv.com/Images/mixed/Happy-Anniversary.jpg" } 
           placeHolderImage     = { { suffix : '-thumb' } }      
           onClick              = { () => { console.log('hey this onClick prop is working well...... ' ); }
        />
    ---



## Usage:-
---

```
import React from 'react';
import LazyProgressiveLoad from './Components/LazyProgressiveImageLoading/LazyProgressiveImageLoading';
const App = () => {
    const style = {
        width : '300px',
    };
    const hello = () => { console.log('helloo onClick function for image is working tan tanaaa balle balle' ); };
    
    return(
     <div>

       {/* progressive image loading along with lazy loading( prop placeHolderImage is passed ) */}
     
       < LazyProgressiveLoad 
          onClick           = { hello }
          id                = { '1' }
          href              = { 'https://youtube.com' }
          srcImage          = { "https://lbewagia.sirv.com/Images/mixed/photo-1503803548695-c2a7b4a5b875.jpeg" }
          placeHolderImage  = { { prefix:'thumbnail-' } }
          style             = { style }
        />
       < LazyProgressiveLoad 
          id                = { 'aniversary' }
          srcImage          = { "https://lbewagia.sirv.com/Images/mixed/Happy-Anniversary.jpg" }
          placeHolderImage  = { {url:"https://lbewagia.sirv.com/Images/mixed/thumbnail-Happy-Anniversary-thumb.jpg" } } 
          alt               = { 'Happy Aniversary' }
          style             = { style }
        />
       < LazyProgressiveLoad 
          id                = { '2' }
          srcImage          = { "https://lbewagia.sirv.com/Images/mixed/pexels-photo-814499.jpeg" }
          placeHolderImage  = { {suffix:'-thumbnail' } } 
          style             = { style }
        />
      < LazyProgressiveLoad 
          srcImage          = { "https://lbewagia.sirv.com/Images/mixed/download.jpeg" }
          placeHolderImage  = { { prefix:'thumbnail-', suffix:'-thumb' } }
          style             = { style }
        />

       {/* simple image loading along with lazy load(no placeHolderImage prop passes) */}
       
       < LazyProgressiveLoad 
          srcImage          = { "https://lbewagia.sirv.com/Images/mixed/gettyImages-990972132.jpg" }
          style             = { style }
          href              = { 'https://instagram.com' }
          onClick           = { hello }
        />
     </div>
    );
};
export default  App;
```




