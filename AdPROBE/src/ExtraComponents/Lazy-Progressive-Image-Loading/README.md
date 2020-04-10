# LazyProgressiveImageLoading #

[![npm Version](https://lbewagia.sirv.com/Images/reamdme-stuffs/lazyprogressiveimageloadingVersion.svg)](https://www.npmjs.com/package/lazyprogressiveiamgeloading)
---

---
This component is developed for ReactJs as solution to provide option to the user to embed image efficiently in the application which will ultimately speed up the application loading with internal implementation of Lazy Loading for simple image loading and progressive image loading, one of the milestone to use this component is that not only the original images in progressive image loading are lazily loading in fact the placeholder images are also lazily loaded.

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
        * this prop is also must be provided every time you use the component.
        * it is due to that embeding an image without providing source doesn’t make any sense.
        * it must be a valid url and it’s length must not be zero.
        * this props is internally used as src attribute used in img html tag.
        * an invalid url string passes will quit the compilation process and nothing gets displayed.
        * use of this prop, without optional prop ‘placeHolderImage’ will result in lazy and non-progressive image loading.
        * to achive lazy-progressive image loading use ‘placeHolderImage’ prop appropriately.

## 2. placeHolderImage
	
    Requirement:-
        * optional

    Type:-
        * object        ( similar to style jsxAttribute for in-line styling style={{ prefix: ‘thumb-’ }} )
	
    Description:-
        * this prop is required if user wants to acheive progressive image loading along with lazy loading (lazy-progressive image loading).
        * this prop must be an object, with only pre-defined following keys:-
            * prefix
            * suffix
            * url
        * this prop has predefined keys and pre-defined rule for keys to exist.
        * keys existing rules:-
            * prefix			only
            * suffix 			only
            * prefix, suffix
            * url				only
        * the value of this prop must not have length zero, ie. It should not be an empty string 
        * NOTE:-
            * if user wants the images to progressively load this prop must have atleast one of the key with only one of the Key existing rule explained above.
            * no value of any key should have length zero.
            * value of prefix and suffix key must be a string, which doesn't result to invalid url.
            * value of url must be string and valid url                 
	
## 3. prefix
	
    Requirement:-
        * optional

    Type:-
        * string        (suggested: thumbnail-, thumb- etc)
            * NOTE:- Do not use ‘thumbnail.’ as value of prefix, it may result in invalidurl
            
	Description:-
        * if user is using hosted image through cdn or through network request option to load images.
        * the value of this prop must be of non zero length.
        * the value provided for this key in prop placeHolderImage internally get prefixed to the srcImage value which results in new url of image to be used as place-holder till the original image gets loaded.

### 4. suffix
	
    Requirement:-
        * optional

    Type:-
        * string        (suggested: -thumbnail, -thumb etc)
            * NOTE:- Do not use ‘thumbnail.’ as value of prefix.
      
	Description:-
        * if user is using hosted image through cdn or through network request option to load image.
        * the value of this prop must be on non zero length.
        * the value provided for this key in prop placeHolderImage internally get suffixed to the srcImage value which results in new url of image to used as place-holder till the original image gets loaded.

### 5. url
	
    Requirement:-
        * optional

    Type:-
        * string        (validUrl)
    
    Description:-
        * if user is using hosted image through cdn or through network requests wants to dedicatedly assess the url of the image resource.
        * this key will be directly assigned as the src for original image when lazily loaded.

### 6. style
	
    Requirement:-
        * optional

    Type:-
        * object        ( similar to style jsxAttribute for in-line styling style={{ width : '400px' }} )
	
    Description:-
        * to give style to the img tag.
        * this prop is simply passes to the image tag and internally work exactly as style jsx attribute works in react.js.

### 7. alt

	Requirement:-
        * optional

    Type:-
        * string
	
    Description:-
        * to provide alternate text for the image, in case of any failure and image does not get loaded.
        * similar to alt attribute for img tag in jsx and html.

### 8. href

	Requirement:-
        * optional

    Type:-
        * string 		(validUrl)
	
    Description:-
        * to make your image actionalble, pass this prop with valid url.
        * Similar as href attribute for a tag in jsx and html.


### 9. onClick

	Requirement:-
        * optional

	Type:-
        * function 

	Description:-
        * to make your image listen click event and execute the function.
        * similar as onClick attribute for jsx element and onclick attribute in html element.
        * the value must be the typeof a function or a function itself.


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
          onClick = { hello }
          href = { 'https://youtube.com' }
          srcImage = { "https://lbewagia.sirv.com/Images/mixed/photo-1503803548695-c2a7b4a5b875.jpeg" }
          placeHolderImage = { { prefix:'thumbnail-' } }
          style = { style }
        />
       < LazyProgressiveLoad 
          alt = { 'Happy Aniversary' }
          srcImage = { "https://lbewagia.sirv.com/Images/mixed/Happy-Anniversary.jpg" }
          placeHolderImage = { {url:"https://lbewagia.sirv.com/Images/mixed/thumbnail-Happy-Anniversary-thumb.jpg" } } 
          style = { style }
        />
       < LazyProgressiveLoad 
           srcImage = { "https://lbewagia.sirv.com/Images/mixed/pexels-photo-814499.jpeg" }
           placeHolderImage = { {suffix:'-thumbnail' } } 
           style = { style }
         />
      < LazyProgressiveLoad 
          srcImage = { "https://lbewagia.sirv.com/Images/mixed/download.jpeg" }
          placeHolderImage = { { prefix:'thumbnail-', suffix:'-thumb' } }
          style = { style }
        />
       {/* simple image loading along with lazy load(no placeHolderImage prop passes) */}
       < LazyProgressiveLoad 
          onClick = { hello }
          href = { 'https://instagram.com' }
          srcImage = { "https://lbewagia.sirv.com/Images/mixed/gettyImages-990972132.jpg" }
          style = { style }
        />
     </div>
    );
};
export default  App;
```