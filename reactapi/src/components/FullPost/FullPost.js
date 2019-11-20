import React, { Component } from 'react';

import './FullPost.css';

class FullPost extends Component {

    state = {
        loadedPost: null
    }

    
    render () {
        let post = <p style={{textAlign: 'center'}} > Please select a Post! </p>;
        
        if(this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.employee_name}</h1>
                    
                </div>
            );

        }
    
        return post;
    }

}
export default FullPost;