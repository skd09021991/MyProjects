// when id is provided by user
export const idList = [];

export const getStoredId = () => { 
    // console.log( idList )
    return idList; 
};

export const storeId = ( newId ) => { idList.push( newId ); };




// when id is slefManaged by LazyProgressiveImageLoading implementing hashocode


//for storage of hashcodes with srcImage as a key having array of hash code, 
//if the image is used only once that key(srcImage) will have only one hash code
/*
if the image is used more than once that key(srcImage) will have multiple hashcode stored in the array as the sequence 
and on unmounting of any component, the hash code of the particular component will be popped out from the array 
of corresponding srcImage used in the component
*/
export const selfManagedId = {}

//to return the matching hash will be present at end accroding to the occurance of the image 
export const getSelfManagedId = ( srcImage ) =>{
    return selfManagedId[srcImage][ selfManagedId[srcImage].length -1 ]
}

//storing the hashcodes in the array corresponding to the key in
export const setSelfManagedId = (srcImage) =>{

    let hash = generateHash( srcImage, true )
    if ( selfManagedId[ srcImage ] ){
        selfManagedId[srcImage].push( generateHash( srcImage, true , selfManagedId[ srcImage ][ selfManagedId[srcImage].length - 1 ]  ) )
    }
    else{
        selfManagedId[srcImage] = [ hash ]
    }
}

//for popping the hash code of component on componentWillUnmount from the key which array of hashcode value/values
export const popHash = (srcImage,  hash )=>{

    selfManagedId[srcImage].splice( selfManagedId[srcImage].indexOf( hash ) , 1    )
}

export const generateHash = function hashFnv32a(str, asString, seed) {
    /*jshint bitwise:false */
    var i, l,
        hval = (seed === undefined) ? 0x811c9dc5 : seed;

    for (i = 0, l = str.length; i < l; i++) {
        hval ^= str.charCodeAt(i);
        hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
    }
    if( asString ){
        // Convert to 8 digit hex string
        return ("0000000" + (hval >>> 0).toString(16)).substr(-8);
    }
    return hval >>> 0;
}