import React from 'react';

const person = (props) => {
   return  (
       <div> 
        <p>i am {props.name} and i am {props.age} years old !</p>
         <p>{props.children}</p>

       </div>
         
   );
}

export default person;