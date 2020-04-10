import React, { Component } from "react";
import Group from "../Assets/Group.svg";
import "../scss/about.scss";
import "../scss/content.scss";
import CeoImage from "../Assets/Quesus-head-shot.png";
import Group6097 from "../Assets/Group6097.svg";
import { NavLink } from 'react-router-dom';
import Box from './common/box'
import LazyProgressiveLoad from '../ExtraComponents/Lazy-Progressive-Image-Loading/src/LazyProgressiveImageLoading/LazyProgressiveImageLoading';


class About extends Component {

  constructor(props) {
    super(props);
    this.state = {
      box: [
				{ imageSrc: '/media/video-conference.svg', heading: '80M+', boxContent: 'Request Servered', animationName: 'slideInDown'},
				{ imageSrc: '/media/Page-1.svg', heading: '16M+', boxContent: 'Unique IPs', animationName: 'slideInUp'},
				{ imageSrc: '/media/multi-devices.svg', heading: '8M+', boxContent: 'Unique Devices', animationName: 'slideInDown'},
				{ imageSrc: '/media/world.svg', heading: '150+', boxContent: 'Countries', animationName: 'slideInUp'}
			],

    }

  };


  render() {
    this.box = this.state.box.map((item, key) => <Box key={this.state.box.indexOf(item)} box={item} />);
    return (
      <div>
        <div className="dummy-header"></div>
          <section>
            <div className="comman-page-heading wow fadeIn">
              <h2>About us</h2>  
            </div>  
          </section> 

        <div className="container-fluid about_container">
           <section className="first_section">
          <div className="col-md-5 col-sm-12 col-xs-12">
            <div className="first_image" >
              {/* <img alt="" src={Group} /> */}
              < LazyProgressiveLoad 
                //onClick = { hello }
                //href = { 'https://youtube.com' }
                srcImage = { Group }
                placeHolderImage = { { url: Group6097} }
                //style = { style }
              />
             
            </div>
          </div>
          <div className="col-md-4 col-sm-12 col-xs-12 ">
            <div className="story_container">
            <h1 className="section_header">Our Story</h1>
            <div className="section_text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a
              iaculis elit, eu congue eros. Sed ullamcorper lacus velit, sit
              amet aliquam nunc scelerisque ac. Praesent eu finibus nunc.
              Phasellus eu justo ultrices elit semper hendrerit non quis risus.
              Donec ac justo neque. Sed sed interdum mauris, ut faucibus justo.
              In vitae risus ut ligula mollis commodo ut vitae enim. Nullam elit
              diam, interdum et arcu id, placerat porttitor ante. Duis semper
              mattis ante, eget condimentum ante ultrices ut.
            </div>
            <br />
            <div className="section_text">
              Sed ullamcorper lacus velit, sit amet aliquam nunc scelerisque ac.
              Praesent eu finibus nunc. Phasellus eu justo ultrices elit semper
              hendrerit non quis risus. Donec ac justo neque. Sed sed interdum
              mauris, ut faucibus justo. In vitae risus ut ligula mollis commodo
              ut vitae enim. Nullam elit diam, interdum et arcu id.
            </div>
            <br />
            <div className="first_section_bottom">
              <div className="ceo_image">
                <img  alt="" src={CeoImage} />
              </div>
              <div>
                <div className="secondary_header">Siddhant Tyagi</div>
                <div className="secondary_text">{`Ceo & Founder`}</div>
              </div>
            </div>
            </div>
           
          </div>
        </section>
        <section>
					<div className="sec-3-cover">
						<div className="sec-3">
							<div className="sec-3-heading">
								<h2>Success You Can Measure</h2>
								<p></p>
							</div>
							<div className="row">
								{this.box}
							</div>
						</div>
					</div>
				</section>

        <section className="col-12 second_section">
          <div className="second_section_container">
          <div className="col-md-4 col-sm-12 col-xs-12 second_section_text_container">
            <div style={{ width: '103.6%' , marginLeft: '-10px' }}>
            <div className="section_header">{`Mission & Vision`}</div>
          <div className="section_text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in
            ullamcorper metus. Nulla scelerisque sem eget dictum pharetra.
            Integer fermentum arcu in leo faucibus malesuada vitae at tellus.
            Sed in pharetra dui. Praesent vel felis aliquet, pharetra tellus ut,
            ornare justo. Nullam tristique tellus vel tellus dictum
          </div>
          <br />
          <ul>
            <li className="active">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
            <li>Ipsum dolor sit amet, consectetur adipiscing elit.</li>
            <li>Cras non viverra ex. Quisque sodales mi a magna efficitur</li>
           
          </ul>
          <div>
            <li style={{texDecoration: 'none' , listStyleType: 'none'}}><NavLink to="/contact" activeClassName="active">Contact Us</NavLink></li>
          </div>
          
        
          
         
          </div>
          
          </div>
          <div className="col-md-6 col-sm-12 col-xs-12">
            <div style={{width: '95.9%'}}>
            {/* <img alt="" src={Group6097} width="100%" height="100%" /> */}
            < LazyProgressiveLoad 
                //onClick = { hello }
                //href = { 'https://youtube.com' }
                srcImage = { Group6097 }
                placeHolderImage = { { url: Group} }
                //style = { style }
              />
           
            </div>
          </div>
          </div>
        </section>
        {/* <section className="third_section container">
          <div style={{ width: '100%' , marginBottom: '61px' }} className="section_header text-center">
            <span>Our Team Member</span>
          </div>
          <div className="col-12 card_container">
            {[ ...Array(3) ].map(item => {
             
                return <div className="col-md-4 col-sm-12 col-xs-12">
                  <div className="card_item">
                  <div className="card_item_image">
                  <div>
                    <img src={CeoImage} width="100%" height="100%" alt=""/>
                  </div>
                </div>
                <div className="card_secondary_header">
                  Siddhant Tyagi
                </div>
                <div className="card_secondary_text">
                  {'CEO & Founder'}
                </div>
                <div className="card_seperator"/>
                <div className="social_container">
                  <div className="social_icons">
                  <a href="https://www.facebook.com"><i  class="fa fa-facebook-official" aria-hidden="true" width="100%" height="100%"></i></a>
                    
                  </div>
                  <div className="social_icons">
                  <a href="https://www.twitter.com" ><i href="#" class="fa fa-twitter-square" aria-hidden="true" width="100%" height="100%"></i></a>
                   
                  </div>
                  <div className="social_icons">
                  <a href="https://www.linkedin.com" ><i href="#" class="fa fa-linkedin-square" aria-hidden="true" width="100%" height="100%"></i></a>
                   
                  </div>
                </div>
                  </div>
                
              </div> 
            })}
            
          </div>
        </section>  */}
      </div>
      </div>
      
    );
  }
}
export default About;

