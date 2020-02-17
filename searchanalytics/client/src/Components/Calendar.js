import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './Calendar.css';
import { Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import './Calendar.css';
import moment from "moment";
import axios from 'axios';
import {API} from './constant';


let globalHistory = {};
window.onbeforeunload = function(e) {
 globalHistory.push({ pathname: globalHistory.location.pathname, state: {}}) //this method is for handling the current state of the Calendar 
};

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todayDate: new Date(),
      startDate: props.history.location.state ? props.history.location.state.startDate ? this.props.history.location.state.startDate : new Date(moment().subtract(9, 'days')) : new Date(moment().subtract(9, 'days')),
      endDate: props.history.location.state ? props.history.location.state.endDate ? this.props.history.location.state.endDate : new Date(moment().subtract(2, 'days')) : new Date(moment().subtract(2, 'days'))
    };
  }
 
  handleStartChange = date => {
      
    this.setState({
      startDate: date
       });
       this.props.changeStartDate(date)
  };

  handleEndChange = ( date) => {
    
    this.setState({
      
      endDate: date
     
    });
    this.props.changeEndDate(date)

  };

  getDateResult = () => {
    
    // this.props.setLoading();
    axios.get(`${API}/fetchsearchmetrics/?from=${moment(this.state.startDate).format('YYYY-MM-DD')}&to=${moment(this.state.endDate).format('YYYY-MM-DD')}`)
     
   
        .then(response => {
            //console.log('check response ===>', response)
            this.props.setInstanceData(response.data)
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

 
  render() {
    globalHistory = this.props.history;
    return (
      <div style={{position:"relative" , display: "flex" , alignItems:'center' }} className="mainDiv">
      <div style={{position:"relative" , display:'inlie-block' , marginRight:'10px'}}>
        <label>From:
        </label>
        <DatePicker
        className="fromDate"
        dateFormat="dd/MM/yyyy"
        placeholderText="Click to select a date"
        selected={this.state.startDate}
        onChange={this.handleStartChange}
        maxDate={this.state.todayDate}
        
       
       
      />
      </div>
      <div style={{position:"relative" , display:'inline-block' ,marginRight:'10px'}}>
      <label>To:
      </label>
      <DatePicker
      className="toDate"
      dateFormat="dd/MM/yyyy"
      placeholderText="Click to select a date"
      selected={this.state.endDate}
      onChange={this.handleEndChange}
      
      minDate={this.state.startDate}
      maxDate={this.state.todayDate}
    />
    </div>
    <div>
    <div>
      <Button
      style={{backgroundColor:'#ff8000'}}
        variant="contained"
        color="secondary"
        endIcon={<SearchIcon/>}
        onClick={this.getDateResult}
      >
        Fetch
      </Button>
    </div>
    </div>
    </div>
      
    );
    }
}
    export default Calendar;



    /*
    
    this component is for the calendar widget and it fetch the data from the APi and stored in the response.data
    and it takes only 2 dates like startDate and endDate and send the 2 dates with the api for fetching the data 
    between the particular dates from the backend


    */