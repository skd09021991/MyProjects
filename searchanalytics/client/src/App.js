import React, { Component } from 'react';
import AuthService from './Components/AuthService';
import withAuth from './Components/withAuth';
import { Button } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import axios from 'axios';
import './App.css';
import Callender from './Components/Calendar';
import moment from 'moment';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Header from './Components/Header';
import { API } from './Components/constant';

const Auth = new AuthService();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHome: window.location.pathname.match('/charts') ? false : true,
     instances: [],
     startDate: props.history.location.state ? props.history.location.state.startDate ? this.props.history.location.state.startDate : new Date(moment().subtract(9, 'days')) : new Date(moment().subtract(9, 'days')),
     endDate: props.history.location.state ? props.history.location.state.endDate ? this.props.history.location.state.endDate : new Date(moment().subtract(2, 'days')) : new Date(moment().subtract(2, 'days')),
    isLoading: true,
    showChart: window.location.pathname.match('/charts') ? true : false
    };
    
  }

  componentDidMount() {

    axios.get(`${API}/fetchsearchmetrics/?from=${moment(this.state.startDate).format('YYYY-MM-DD')}&to=${moment(this.state.endDate).format('YYYY-MM-DD')}`)
        
         .then(response => {
            //console.log('check response ===>', response)
            this.setInstanceData(response.data)
         })
         .catch(function (error) {
          if (error.response) {
             // The request was made and the server responded with a status code
             // that falls out of the range of 2xx
             console.log(error.response.data);
             console.log(error.response.status);
             console.log(error.response.headers);
           } else if (error.request) {
            // The request was made but no response was received
             // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
             // http.ClientRequest in node.js
             console.log(error.request);
           } else {
             // Something happened in setting up the request that triggered an Error
             console.log('Error', error.message);
           }
           console.log(error.config);
         });
  }

  setInstanceData = (data) => {

    this.setState({
      instances: data,
      isLoading: false
    })
  }

  getTotalCount = (instance, value) => {
    let count = 0;
    Object.keys(instance.metric).forEach(instanceKey => {
      instance.metric[instanceKey].forEach(item => {
        count += item[value] 
      })
    }) 
    return count;
  }
  getInstanceCount = (instanceArray, value) => instanceArray.reduce((acc, instance) => instance[value] + acc, 0);

  getAdultCalc = (firstParam , secondParam) => secondParam - firstParam;

  getRealTime = (firstParam , secondParam)  => firstParam - secondParam;

  getGeoTargeted = (firstParam , secondParam) => firstParam - secondParam;

  getLowPaying = (firstParam) => 1 - firstParam;
  
  
  handleLogout = () => { //This method handels the logout and takes to the initial login page 
    Auth.logout()
      .then(res => {
        this.props.history.replace('/login');
      })
  }
  

 handleContent = (currentContent) => {
        const { instances } = this.state;
        const currentInstance = instances.find(instance => instance.metric_date === currentContent.metric_date);
        this.setState({
          currentInstance
        })
        this.toggleHome();
        this.toggleContent();
 }
 //toggle the details for the particular instance when the instance is clicked
 toggleContent = () => {
  this.setState({
    showContent: !this.state.showContent
  })
  this.toggleHome();
 }

 toggleHome = () => {
  this.setState({
    showHome: !this.state.showHome
  })
 }

 toggleChart = () => {
   //console.log('cheke ehre', this.state.startDate)
  this.props.history.push({ pathname: '/chart', state: { startDate: this.state.startDate, endDate: this.state.endDate } })
 }
 

 getInstanceCount = (instanceArray, value) => instanceArray.reduce((acc, instance) => instance[value] + acc, 0);

 setLoading = () => {
   this.setState({
     isLoading: true
   })
 }
 changeEndDate = (date) => {
   this.setState({
     endDate: date
   })
 }

 changeStartDate = date => {
   this.setState({
     startDate: date
   })
 }
  render() {    //This render method consist of appbar in dashboard page( after the login page ) displaying the user's name which is stored in the local storage
               const { instances,
                showContent, currentInstance, showHome } = this.state;
               //console.log('state', this.state); 
    return (
        <div>
                      <Header handleLogout={this.handleLogout} user={this.props.user}/>
          {showHome && <div>
          <div className="middleButton">
          <Button type="chartButton" disabled={true} style={{backgroundColor:'#ff8000', marginLeft:'10px'}} onClick={this.toggleMetrics} variant="contained">Metrics</Button>  
          <Button type="chartButton" style={{backgroundColor:'#ff8000', marginLeft:'10px'}} onClick={this.toggleChart} variant="contained">Charts</Button> 
          
          </div>
          
          <div>
            <Callender changeStartDate={this.changeStartDate} changeEndDate={this.changeEndDate} history={this.props.history} setLoading={this.setLoading} setInstanceData={this.setInstanceData}/>
          </div>
          
          
        
         <div className="expansion-lists" style={{ marginLeft:'20px' , marginTop: '64px', padding: '0 24px'}}>
          
           {
             instances.map(instance => (
              <div  style={{ marginTop: '24px'}} onClick={() => this.handleContent(instance)}>
                <div
                  
                  expandicon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                <div className="sideBar" style={{ display: 'flex',flexDirection:'row',marginLeft:'20px',flexWrap:'nowrap', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                  <div className ="counts"style={{width:'50%'}}> <strong>{instance.metric_date}</strong></div>
                  <div className ="counts"><strong>Total Searches: {this.getTotalCount(instance, 'searches')}</strong></div>
                  <div className ="counts"><strong>Total Clicks: {this.getTotalCount(instance, 'clicks')}</strong></div>
                  <div className ="counts"><strong>Total Follow-On: {this.getTotalCount(instance, 'follow_on')}</strong></div>
                </div>
              </div>
                
              </div>
             ))
           }
          </div>
          </div>}
            {showContent && <div style={{ width: '100vw', height: '100vh'}}>
            <Button type="button" style={{marginTop:'20px',backgroundColor:'#ff8000', marginLeft:'10px'}} onClick={this.toggleContent} variant="contained">Back</Button>
            <div className='date'> <strong>Date: {currentInstance.metric_date}</strong></div>
             <div className='expansionList' style={{ width: '300px'  }}>
             {
             currentInstance && Object.keys(currentInstance.metric).map(instance => (
              <ExpansionPanel className='expansionList' style={{ marginTop: '24px'}}>
                <ExpansionPanelSummary
                 
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <div style={{ display: 'flex',flexDirection:'row',flexWrap:'nowrap', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                  
              <div className ="counts" style={{display:'block',position:'relative',width:'50%'}}> <strong>{instance}</strong></div>
              <div className ="counts"><strong>Total Searches:{this.getInstanceCount(currentInstance.metric[instance], 'searches')}</strong></div>
              <div className ="counts"><strong>Total Clicks: {this.getInstanceCount(currentInstance.metric[instance], 'clicks')}</strong></div>
              <div className ="counts"><strong>Total follow_on: {this.getInstanceCount(currentInstance.metric[instance], 'follow_on')}</strong></div>
                  </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
             <div style={{ width: '60%' }}>
                                      {currentInstance.metric[instance].map(instance => {
                                      return <div className="cards-container">
                                        <div className="instance-card">
                                        <Card className="card">
                                      <CardContent>
                                        <div style={{ width: '90%', display: 'flex',flexWrap:'nowrap', }}>
                                          <div style={{ width: '35%', boxSizing: 'border-box', padding: '2px' }}>
                                          <div className="display" style={{ display: 'flex',flexWrap:'nowrap', alignItems: 'center' }}>
                                          <h4 style={{marginRight:'5px'}}>Searches:</h4>
                                      <div>{instance.searches}</div>
                                          </div>
                                          <div className="display">
                                          <h4 style={{marginRight:'5px'}}>Clicks:</h4>
                                      <div>{instance.clicks}</div>
                                          </div>
                                          <div className="display">
                                          <h4 style={{marginRight:'5px'}}>Proxy:</h4>
                                      <div>{instance.proxy}</div>
                                          </div>
                                          <div className="display">
                                          <h4 style={{marginRight:'5px'}}>follow_on:</h4>
                                      <div>{instance.follow_on}</div>
                                          </div>
                                          <div className="display">
                                          <h4 style={{marginRight:'5px'}}>Instance Type:</h4>
                                      <div>{instance.instance_type}</div>
                                          </div>
                                          <div className="display">
                                          <h4 style={{marginRight:'5px'}}>Instance Id:</h4>
                                      <div>{instance.instance_id}</div>
                                          </div>
                                          </div>
                                          <div style={{ width: '46%', boxSizing: 'border-box', padding: '1px' }}>
                                          <div>
                                          <h4 style={{marginBottom:'0'}}>Clicks Ratio:</h4>
                                      <div>minima: {`[${instance.click_ratio['minima'].toString()}]`}</div>
                                      <div>maxima: {`[${instance.click_ratio['maxima'].toString()}]`}</div>

                                          </div>
                                                                            <div>
                                            <h4 style={{marginBottom:'0'}}>Keywords Ratio:</h4>
                                        <div className="display">
                                          <div style={{marginRight:'5px'}}>High paying: </div>
                                        <div>{Math.round((instance.keywords_ratio.high_paying)*100)+ "%"}</div>
                                        </div>
                                        <div className="display">
                                          <div style={{marginRight:'5px'}}>Adult: </div>
                                        <div>{Math.round((this.getAdultCalc(instance.keywords_ratio.high_paying,instance.keywords_ratio.adult))*100)+ "%"}</div>
                                        </div>
                                        <div className="display">
                                          <div style={{marginRight:'5px'}}>Real Time: </div>
                                        <div>{Math.round((this.getRealTime(instance.keywords_ratio.realtime,instance.keywords_ratio.adult))*100)+"%"}</div>
                                        </div>
                                        <div className="display">
                                          <div style={{marginRight:'5px'}}>Geo Targeted: </div>
                                        <div>{Math.round((this.getGeoTargeted(instance.keywords_ratio.geotargeted,instance.keywords_ratio.realtime))*100)+"%"}</div>
                                        </div>
                                        <div className="display">
                                          <div style={{marginRight:'5px'}}>Low Paying: </div>
                                        <div>{Math.round(this.getLowPaying(instance.keywords_ratio.geotargeted)*100)+ "%"}</div>
                                        </div>
                                            </div>
                                            </div>

                                          <div style={{ width: '25%',boxSizing: 'border-box', padding: '1px' ,display:'flex',flexWrap:'nowrap' }}>
                                          <div>
                                          <h4 style={{marginBottom:'0'}}>Processes:</h4>
                                          {
                                                    Object.entries(instance.processes).map(item=>{
                                                      return  <p> {item[0]+':'+item[1]}</p>
                                                      
                                                    })
                                                  }
                                          </div>
                                          </div>

          
                                     </div>
                                  </CardContent>
                                </Card>

                              </div>
        
                            </div>
                          })}
                        </div>
                </ExpansionPanelDetails>
              </ExpansionPanel>
             ))
           }
                      </div>
                  </div>}
                  
         
                </div>
    
            );
        }
     }

export default withAuth(App);


