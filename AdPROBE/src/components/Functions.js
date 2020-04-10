import React, { Component } from 'react';

class Functions extends Component {

  constructor(props) {
    super(props);
    this.myname = "Working";
    this.state = {};
  }


  sayname(name){
    return "Hello " + name;
  }



  render() {
    return (
      <div>
        
      </div>
    )
  }
}


export default Functions;
