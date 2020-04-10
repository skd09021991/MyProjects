import React, {Component} from 'react';
import '../scss/footer.scss';
import { NavLink } from 'react-router-dom';
import { Link } from '@material-ui/core';

class Footer extends Component {
    
  render() {
    return (
      <div>
        <footer>
              <div className="footer-cover">
                  <div className="footer">
                    <div className="row">
                        <div className="col-md-6 col-sm-6">
                            <div className="footer-menu social-media">
                                <h2>Subscribe Our Newsletter</h2>
                                <ul>
                                    <li>
                                        <form className="form-group">
                                            {/* <input type="text" placeholder="Enter email address" name="email" /> */}
                                            <div className="input-group mb-3">
                                                <input type="text" className="form-control" placeholder="Enter email address" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                                <div className="input-group-append">
                                                    <button type="button"><i className="fa fa-paper-plane" aria-hidden="true"></i></button>
                                                </div>
                                            </div>
                                        </form>
                                    </li>
                                    {/* <li>
                                        <ul>
                                            <li><Link to="/" ><i className="fa fa-facebook-f"></i></Link></li>
                                            <li><Link to="/" ><i className="fa fa-twitter"></i></Link></li>
                                            <li><Link ><i className="fa fa-instagram"></i></Link></li>
                                            <li><Link ><i className="fa fa-linkedin"></i></Link></li>

                                        </ul>
                                    </li> */}
                                    <div className="copyrights"><NavLink to="/">© {(new Date().getFullYear())} AdProbe. All rights reserved.</NavLink></div>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            {/* <div className="footer-menu">
                                <h2>Site Map</h2>
                                <ul>
                                <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
                                <li><NavLink to="/about" activeClassName="active" className="">About</NavLink></li>
                                <li><NavLink to="/career" activeClassName="active">Career</NavLink></li>
                                <li><NavLink to="/contact" activeClassName="active">Contact Us</NavLink></li>
                                </ul>
                            </div> */}
                            <div className="footer-menu social-media">
                            <h2>Social Media</h2>
                                <ul>
                                        <ul>
                                            <li><Link to="/" ><i className="fa fa-facebook-f"></i></Link></li>
                                            <li><Link to="/" ><i className="fa fa-twitter"></i></Link></li>
                                            <li><Link ><i className="fa fa-instagram"></i></Link></li>
                                            <li><Link ><i className="fa fa-linkedin"></i></Link></li>

                                        </ul>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-2 col-sm-6">
                            <div className="footer-menu">
                                <h2>Company</h2>
                                <ul>
                                    {/* <li><NavLink to="/career" activeClassName="active">Career</NavLink></li>
                                    <li><Link to="/" >Testimonials</Link></li>
                                    <li ><Link to="/" >Terms & Conditions</Link></li> */}
                                    <li><NavLink to="/privacy" activeClassName="active">Privacy Policy</NavLink></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-1 col-sm-6">
                            <div className="footer-menu">
                                {/* <h2>Resource</h2> */}
                                <ul>
                                {/* <li><NavLink to="/blog" activeClassName="active">Blog</NavLink></li>
                                    <li><Link to="/" >GDPR Disclaimer</Link></li>
                                    <li><NavLink to="/contact" activeClassName="active">Contact Us</NavLink></li> */}
                                </ul>
                            </div>
                        </div>
                    </div>
                  </div>
              </div>
          </footer>

      </div>
    )
  }
}


export default Footer;
