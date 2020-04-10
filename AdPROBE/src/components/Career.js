import React, {Component} from 'react';
import '../scss/career.scss';
import {jobsList} from './CareersData';
//import Modal from '@material-ui/core/Modal';
import { Dialog, Link } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faClock, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import '../scss/ScheduleDemo.scss';
//import { faCheck } from '@fortawesome/free-solid-svg-icons'
//import InputLabel from '@material-ui/core/InputLabel';
import ReCAPTCHA from "react-google-recaptcha";
import '../scss/content.scss';
import LazyProgressiveLoad from '../ExtraComponents/Lazy-Progressive-Image-Loading/src/LazyProgressiveImageLoading/LazyProgressiveImageLoading';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from 'axios';
import Group6097 from "../Assets/Group6097.svg";


class Career extends Component {
  // const [scroll, setScroll] = React.useState('paper');
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      jobsList,
      jobsData: jobsList,
      currentTab: 'all',
      error: {
        numLength: 13
    },
    contact_number: '',
    formSubmitted: false,
   
    
    }
    this.verifyCallback = this.verifyCallback.bind(this);
  }
  
  toggleContent = (position_id) => {
    
    const { jobsData } = this.state;
    this.setState({
      jobsList: jobsData.filter(job => job.position_id === position_id),
      currentTab: position_id
    })
  }

  showContent = (position_id ) => {
    let job = jobsList.find(item => item.position_id === position_id);
     this.setState({
      open: !this.state.open,
      career: job
     })
     
  }

  handleClose = () => [
    this.setState({
      open: false
    })
  ]
  showAll = () => {
    const {jobsData} = this.state
    this.setState({
      jobsList: jobsData,
      currentTab: 'all'
    })
  }
  showDemoSlider = () => {
    this.setState({
    infoDialog: !this.state.infoDialog
  })
}
  handleChange = (e) => {
    const { error } = this.state;
    if(e.target.value && e.target.name === 'contact_number') {
        if(e.target.value.length === 1 && e.target.value.split('')[0] === '+'){
            this.setState({
                [e.target.name]: e.target.value
            })
        } else if(e.target.value.length === 1 && /^[0-9]+$/.test(e.target.value)) {
            this.setState({
                [e.target.name]: e.target.value,
                error: {
                    ...error,
                    numLength: 10
                }
            })
        }
         else if(/^[0-9]+$/.test(e.target.value.slice(1))) {
            
            this.setState({
                [e.target.name]: e.target.value
            })
        } else {
            return
        }
    } 
    else {
        
        this.setState({
            [e.target.name] : e.target.value,
            error: {
                ...error,
                numLength: 13
            }
        })
    }
    
}
verifyCallback(recaptchaToken) {
  // Here you will get the final recaptchaToken!!!  
  //console.log("hiiiiiiiiiiiiiiiii")
  this.setState({
    recaptchaToken
  })
  //console.log(recaptchaToken, "<= your recaptcha token")
}


onSubmit = (e) => {
  const { email_id, error } = this.state;
  if(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email_id)) {
    //this.handleClose();
   //this.showDemoSlider();
  let data = Object.keys(this.state).reduce((acc , item) => {
      if(item !== 'error') {
       return {
           ...acc,
           [item]: this.state[item]
       }
      }
      return ""
      
  }, {});
  
  console.log(data);
  
  } else {
      this.setState({
          error: {
              ...error,
              email_id: true
            
          }
      })
  }
  const formData = new FormData();
// If file selected
		
			formData.append('file-upload', this.state.file[0], this.state.email_id + '_' + Date.now() + '.' + this.state.file[0].name.split('.')[this.state.file[0].name.split('.').length - 1] )
			axios.post( '/api/profile/upload', formData, {
				headers: {
					'accept': 'application/json',
					'Accept-Language': 'en-US,en;q=0.8',
					'Content-Type': 'multipart/form-data'
				}
			})
			.then(response => {
        
        this.setState({
          formSubmitted: true
        })
       // Put the fileType in the headers for the upload
        
      })
      .catch(error => {
        alert(JSON.stringify(error));
      })
	
}
handleInputOnBlur = (inputType) => {
  const { email_id, error } = this.state;
  if(inputType === 'email_id'){
    if(/^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/.test(email_id)) {
      this.setState({
        error: {
            ...error,
            email_id: false
          
        }
    })
    } else {
      this.setState({
        error: {
            ...error,
            email_id: true
          
        }
    })
    } 
  } else {
    if(!this.state[inputType]) {
      this.setState({
          error: {
              ...this.state.error,
              [inputType]: true
          }
      })
  }  else {
    this.setState({
      error: false
    })
  }
  } 


}

  handleRadioChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleFileChange = (e) => {
      
  
    const { error} = this.state;
    var regex = new RegExp("(.*?).(pdf|docx|doc)$");
    if(!regex.test(e.target.value.toLowerCase())){
      this.setState({
        error: {
           ...error,
           Resume: true,
           exceedsFileSize: false
        }
      })
    } else {
      let FileSize = e.target.files[0].size / 1024 / 1024; // in MB
      //console.log('hhiii',FileSize)
      if (FileSize > 2) {
          this.setState({
            error: {
              ...error,
              exceedsFileSize: true
            }
          })
         // $(file).val(''); //for clearing with Jquery
      } else {
        this.setState({
          error: {
            ...error,
            Resume: false,
            exceedsFileSize: false,
            
          },
          file: e.target.files
        })
      }
      
    }


  }
  toggleDialog = () => {
    this.setState({
      open: !this.state.open,
      formSubmitted: false

    })
  }
    
    render() {
      // console.log(jobsList);
      const { open, career, jobsList , currentTab   ,  contact_number, error ,recaptchaToken } = this.state;
      const { candidate_name  , email_id , formSubmitted} = this.state;
    //console.log('check state', this.state);
    //console.log('width',window.innerWidth < 480)
      return (
        <div>
          <div className="dummy-header"></div>
          <section>
            <div className="comman-page-heading wow fadeIn">
              <h2>Career At Adprobe</h2>  
            </div>  
          </section>  


          <section>
            <div className="career-sec-2-cover">
              <div className="career-sec-2">
                <div className="career-sec-2-heading wow fadeIn">
                  <h2>Benefits to make employee Wellness, Professional & Personal Growth</h2>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <div className="benifits-box wow fadeInLeft" data-wow-delay="0s">
                      <div className="benifits-box-icon">
                        <img src="/media/career-icon-1.svg" alt="careers" />
                      </div>
                      <h3>Great Team</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a iaculis elit, eu congue eros. Sed rper lacus velit, sit amet aliquam.</p>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="benifits-box wow fadeInDown" data-wow-delay=".1s">
                      <div className="benifits-box-icon">
                        <img src="/media/career-icon-3.svg" alt="careers" />
                      </div>
                      <h3>Benifits</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a iaculis elit, eu congue eros. Sed rper lacus velit, sit amet aliquam.</p>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="benifits-box wow fadeInRight" data-wow-delay=".2s">
                      <div className="benifits-box-icon">
                        <img src="/media/career-icon-2.svg" alt="careers" />
                      </div>
                      <h3>World Tour</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a iaculis elit, eu congue eros. Sed rper lacus velit, sit amet aliquam.</p>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="benifits-box wow fadeInLeft" data-wow-delay=".1s">
                      <div className="benifits-box-icon">
                        <img src="/media/career-icon-1.svg" alt="careers" />
                      </div>
                      <h3>Great Team</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a iaculis elit, eu congue eros. Sed rper lacus velit, sit amet aliquam.</p>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="benifits-box wow fadeInUp" data-wow-delay=".2s">
                      <div className="benifits-box-icon">
                        <img src="/media/career-icon-3.svg" alt="careers" />
                      </div>
                      <h3>Benifits</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a iaculis elit, eu congue eros. Sed rper lacus velit, sit amet aliquam.</p>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="benifits-box wow fadeInRight" data-wow-delay=".3s">
                      <div className="benifits-box-icon">
                        <img src="/media/career-icon-2.svg" alt="careers" />
                      </div>
                      <h3>World Tour</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a iaculis elit, eu congue eros. Sed rper lacus velit, sit amet aliquam.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>


          <div>
            <section>
              <div className="jobs-cover">
                <div className="jobs-in">
                  <div className="jobs-header wow fadeIn">
                    <h2>Open Positions</h2>
                    <div className="jobs-filter">
                      <ul>
                        <li><Link to="/" className={currentTab === 'all' ? 'active' : ''} onClick={() => this.showAll()}>All</Link></li>
                        <li><Link to="/" className={currentTab === 'web_developer' ? 'active' : ''} onClick={() => this.toggleContent('web_developer')}>Developer</Link></li>
                        <li><Link to="/" className={currentTab === 'designer' ? 'active' : ''} onClick={() => this.toggleContent('designer')} >Designer</Link></li>
                        <li><Link to="/" className={currentTab === 'marketer' ? 'active' : ''} onClick={() => this.toggleContent('marketer')} >Marketer</Link></li>
                        <li><Link to="/" className={currentTab === 'researcher' ? 'active' : ''} onClick={() => this.toggleContent('researcher')}>Researcher</Link></li>
                      </ul>
                    </div>
                  </div>
                  <div className="jobs-list">
                    
                    {/* <div className="job-box accordion">
                      <input type="checkbox" id="handle1" />
                      <h2 className="handle">
                        <label for="handle1">26A. Trappist Single <i>Full time</i></label>
                        <button>Apply now</button>
                      </h2>
                      <div className="content">
                        <p><strong>Overall Impression:</strong> A pale, bitter, highly attenuated and well carbonated Trappist ale, showing a fruity-spicy Trappist yeast character, a spicy-floral hop profile, and a soft, supportive grainy-sweet malt palate.</p>
                        <p><strong>History:</strong> While Trappist breweries have a tradition of brewing a lower-strength beer as a monk’s daily ration, the bitter, pale beer this style describes is a relatively modern invention reflecting current tastes. Westvleteren first brewed theirs in 1999, but replaced older lower-gravity products.</p>
                      </div>
                    </div> */}

                    {jobsList.map((data) => (
                      
                      <div key={ this.state.jobsList.indexOf(data) }className="job-box accordion wow zoomIn">
                      {/* <input type="checkbox" name={'collapse' + data.id} id={'handle' + data.id} /> */}
                      <h2 className="handle">
                      <label  onClick={() => this.showContent(data.position_id)}  htmlFor={'handle' + data.id}><span>{data.position}</span> <i>{data.positionType}</i> <p>{data.location}</p></label>
                        <button onClick={this.toggleDialog} className="btn"><img className="hidden-md hidden-lg" src="/media/work.svg" alt="button icon" />Apply now</button>
                        
                      </h2>
                      
                    </div>

                    ))}


                  </div>

                </div>
              </div>
            </section>
          </div>

          <section>
            <div className="life-cover">
              <div className="life-in">
                  <h2>Life at Adprobe </h2>
                  <div className="row">
                    <div className="col-md-6 d-block d-md-none">
                        <div className="life-img-right">
                          {/* <img src="/media/life.png" alt="life at adprobe" /> */}
                          < LazyProgressiveLoad 
                          //onClick = { hello }
                          //href = { 'https://youtube.com' }
                          srcImage = {"/media/life.png" }
                          placeHolderImage = { { url: Group6097} }
                          alt={"life at adprobe"}
                          //style = { style }
                        />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="life-content-left">
                          <h3>Lorem Ipsum</h3>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in ullamcorper metus. Nulla scelerisque sem eget dictum pharetra. Integer fermentum arcu in leo faucibus malesuada vitae at tellus. Sed in pharetra dui. Praesent vel felis aliquet, pharetra tellus ut, ornare justo.</p>
                          <p>Nulla scelerisque sem eget dictum pharetra. Integer fermentum arcu in leo faucibus malesuada vitae at tellus. Sed in pharetra dui. Praesent vel felis aliquet, pharetra tellus ut, ornare justo.</p>
                        </div>
                    </div>
                    <div className="col-md-6 d-none d-md-block">
                        <div className="life-img-right">
                          {/* <img src="/media/life.png" alt="life at adprobe" /> */}
                      < LazyProgressiveLoad 
                        //onClick = { hello }
                        //href = { 'https://youtube.com' }
                        srcImage = {"/media/life.png"}
                        placeHolderImage = { { url: Group6097} }
                        //style = { style }
                      />
                         
                          
                        </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                        <div className="life-img-right">
                          {/* <img src="/media/life.png" alt="life at adprobe" /> */}
                          < LazyProgressiveLoad 
                          //onClick = { hello }
                          //href = { 'https://youtube.com' }
                          srcImage = { "/media/life.png" }
                          placeHolderImage = { { url: Group6097} }
                          //style = { style }
                        />
                          
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="life-content-left">
                          <h3>Lorem Ipsum</h3>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in ullamcorper metus. Nulla scelerisque sem eget dictum pharetra. Integer fermentum arcu in leo faucibus malesuada vitae at tellus. Sed in pharetra dui. Praesent vel felis aliquet, pharetra tellus ut, ornare justo.</p>
                          <p>Nulla scelerisque sem eget dictum pharetra. Integer fermentum arcu in leo faucibus malesuada vitae at tellus. Sed in pharetra dui. Praesent vel felis aliquet, pharetra tellus ut, ornare justo.</p>
                        </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 d-block d-md-none">
                        <div className="life-img-right">
                          {/* <img src="/media/life.png" alt="life at adprobe" /> */}
                          < LazyProgressiveLoad 
                          //onClick = { hello }
                          //href = { 'https://youtube.com' }
                          srcImage = {"/media/life.png" }
                          placeHolderImage = { { url: Group6097} }
                          //style = { style }
                        />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="life-content-left">
                          <h3>Lorem Ipsum</h3>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in ullamcorper metus. Nulla scelerisque sem eget dictum pharetra. Integer fermentum arcu in leo faucibus malesuada vitae at tellus. Sed in pharetra dui. Praesent vel felis aliquet, pharetra tellus ut, ornare justo.</p>
                          <p>Nulla scelerisque sem eget dictum pharetra. Integer fermentum arcu in leo faucibus malesuada vitae at tellus. Sed in pharetra dui. Praesent vel felis aliquet, pharetra tellus ut, ornare justo.</p>
                        </div>
                    </div>
                    <div className="col-md-6 d-none d-md-block">
                        <div className="life-img-right">
                          {/* <img src="/media/life.png" alt="life at adprobe" /> */}
                          < LazyProgressiveLoad 
                            //onClick = { hello }
                            //href = { 'https://youtube.com' }
                            srcImage = {"/media/life.png" }
                            placeHolderImage = { { url: Group6097} }
                            //style = { style }
                          />
                          
                        </div>
                    </div>
                  </div>
              </div>
            </div>
          </section>
          {open && <Dialog
                  //disableBackdropClick
                  fullScreen={window.innerWidth < 768}
                  //fullScreen={window.innerWidth < 768}
                  onBackdropClick={() => this.setState({ formSubmitted: false})}
                  open={open}
                  onClose={this.handleClose}
                  scroll= 'paper'
                  className= 'dialogBox animate zoomIn'
                   >
                 
                
                <div >
                
                <div className="modal-header">
                  <h5 style={{  marginTop:'13px' , marginLeft: '-11px', color: '#21366e'}} className="modal-title">{career.position}</h5>
                  <h5 className="model-info">
                    <span style={{marginRight: '12px'}}><FontAwesomeIcon style={{color: '#21366e', marginRight: '3px'}} icon={faClock} />{career.positionType}</span>
                   <span><FontAwesomeIcon style={{color: '#21366e'  ,marginLeft: '1px'}} icon={faMapMarkerAlt} /> {career.location}</span></h5>
                          
                  <button onClick={this.toggleDialog} type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                
                
                
                    
                    <div className="row" style ={{paddingTop: '40px'}}>

                    <div className="col-md-7 col-sm-12 col-xs-12">
                        
                      <div className="about" style={{marginTop: '86px'}}>
                      <h5 className="headingText"><strong>About organisation:</strong></h5><br />
                          <h6 className="contentText">{career.aboutOrg}</h6>
                          <div>
                          <h5 className="headingText"><strong>Responsibilities:</strong></h5>
                          <h6 className="contentText">
                            
                            <ul>
                              {career.responsibilities.map(responsiblity => (
                            <li  className="">{`   ${responsiblity}`}</li>
                            ))}

                              
                            </ul>
                            <ul>
                              {career.responsibilities.map(responsiblity => (
                            <li  className="">{`   ${responsiblity}`}</li>
                            ))}

                              
                            </ul>
                            <ul>
                              {career.responsibilities.map(responsiblity => (
                            <li  className="">{`   ${responsiblity}`}</li>
                            ))}

                              
                            </ul>
                            </h6>

                        </div>
                        <div>
                          <h5 className="headingText"><strong>Skills:</strong></h5>
                          <h6 className="contentText ">

                          <ul>
                              {career.Skills.map(skill => (
                            <li  className="">{`   ${skill}`}</li>
                            ))}
                          </ul>
                          
                          </h6>

                        </div>

                        </div>
                      


                      </div>
                      
                     
                      
                      <div className="col-md-5 col-sm-12 col-xs-12">

                      
                        
                        
                        
                        <div className="applyNow" style={{marginTop: '90px'}}>
                    {!formSubmitted ? <form onSubmit={this.onSubmit}>
                       <h3 style={{color: '#21366e' , textAlign: "center"}}>Apply Now</h3>
                       <div onBlur={() => this.handleInputOnBlur('candidate_name')}>
                       
                        <TextField 
                        className="textField"
                        name="candidate_name"
                        type="string"
                        placeholder='Full Name'
                        variant='outlined'
                        
                        
                        required
                        error={error.candidate_name}
                        //id="outlined-error-helper-text"
                        helperText={error.candidate_name && 'Field cannot be empty'}
                        onChange={this.handleChange}
    
                        />
                    </div>

                   

                    <div onBlur={() => this.handleInputOnBlur('email_id')} >
                        
                        <TextField
                         required
                        className="textField"
                        name="email_id"
                        type="email"
                        
                        placeholder='example@domain.com'
                        variant='outlined'
                        
                       
                        error={error.email_id}
                        //id="outlined-error-helper-text"
                        helperText={error.email_id ? this.state.email_id ? 'Enter a valid email' : 'Field cannot be empty' : ''  }
                        onChange={this.handleChange}/>
                    </div>

                    <div onBlur={() => this.handleInputOnBlur('contact_number')}>
                    <TextField
                        className="textField"
                        name="contact_number"
                        inputProps={{
                            maxLength: error.numLength,
                            // value: contact_number
                        }}
                        placeholder='Contact Number'
                        variant='outlined'
                        value={contact_number}
                        error={error.contact_number}
                        //id="outlined-error-helper-text"
                        helperText={error.contact_number && 'Field cannot be empty'}
                        onChange={this.handleChange}/>
                    </div>
                     
                    { /*<div className="radio">
                    
                     <input type="radio"  name="selectedRadio" value="fresher" onChange={this.handleChange}/> 
                     <span>Fresher</span>
                     <input type="radio"  name="selectedRadio" value="experienced" onChange={this.handleChange}/> 
                      <span>Experienced</span>

                     
                      </div> */ }
                      <div className="radio">
                        
                      <RadioGroup style={{ flexDirection: 'row' }} aria-label="experience" name="selectedRadio" value={this.state.selectedRadio} onChange={this.handleChange}>
                      <FormControlLabel style={{ width: '48%'  }} className="fresher" value="fresher" control={<Radio />} label="Fresher" />
                      <FormControlLabel style={{ width: '48%' , marginLeft: '-35px' , marginRight: '1px' }} className="experienced" value="experienced" control={<Radio />} label="Experienced" />
                      
                    </RadioGroup>
                      </div>

                   <div>
                     
                      
                      <div className="fileButton">
                        <h6 style={{float: 'left', fontSize: '13px' }}>Resume(choose only .doc,.pdf, .docx file)</h6>
                       


                       <div className="input-group mb-3">
                        
                        <div className="custom-file">
                          <input aria-describedby="inputGroupFileAddon01"
                            className="custom-file-input"
                            style={{marginBottom: '5px'}}
                            // label="Resume"
                            // name="Resume"
                            type="file" 
                            id="inputGroupFile01" 
                            accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            onChange={this.handleFileChange}
                          />
                          <label style={{textAlign: 'left'}}className="custom-file-label" htmlFor="inputGroupFile01">{this.state.file ? this.state.file[0].name : `Choose file`}</label>
                        </div>
                      </div>

                      {error.Resume && <div className="error">
                       
                        FIle Not supported
                        
                       </div>}
                       {error.exceedsFileSize && <div className="error">
                       
                        FIle Size exceeded 2 MB
                        
                       </div>}
                     </div>
                     <div >
                       <div className="recaptcha">
                       <ReCAPTCHA
                       //size="invisible"
                       render="explicit"
                      className="textField"
                      ref={(r) => this.captcha = r}
                      sitekey="6LddM9gUAAAAAEaWINlCzY2fy5qbR_LNzMnjm8DA"
                      onChange={this.verifyCallback}        

                     />
                       </div>
                     

                    </div>
                    </div>
                    
                    
                   
                    

                    <div>
                        <Button 
                        className="applySubmitButton"
                        onClick={this.onSubmit} 
                        variant="contained"
                        color="primary"
                        disabled={!candidate_name || !recaptchaToken || !contact_number || !email_id || error.Resume}
                        >
                        Apply
                        </Button>
                    </div>

                </form>: <div className="formsubmitted">
                         <i style={{maxWidth: '78px' , textAlign: 'center'}} className="fa fa-check-circle" area-hidden="true"></i>
                         <h6>
                           Form Submitted
                         </h6>
                         <p>We will get back to you soon</p>
                  </div>}
                    </div>

                      </div>

                      
                    </div>
                    
                    

                 </div>
      </Dialog>}
          
       
        </div>
      )
    }
  }
  
  
  export default Career;


