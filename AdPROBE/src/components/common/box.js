import React, {Component} from 'react';

class Box extends Component {
    constructor(props) {
        super(props);
		this.state = {
			
		}
		
    }

    // function Avatar(props) {
    //     return (
        //   <img className="Avatar"
        //     src={props.user.avatarUrl}
        //     alt={props.user.name}
        //   />
          
      
    //     );
    //   }

    render() {
        return (
            <div className="col-md-3">
            <div className={`sec-3-box wow ${this.props.box.animationName}`} data-wow-delay="0s">
                <div className="sec-3-box-img">
                    <img src={this.props.box.imageSrc} alt={this.props.box.heading} />
                </div>
                <h3>{this.props.box.heading}</h3>
                <p>{this.props.box.boxContent}</p>
            </div>
            </div>
        )
    }
    


}
export default Box;