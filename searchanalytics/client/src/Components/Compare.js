// COMPARE CALENDAR WIDGET FOR COMPARING THE URLS OF THE SELECTED DATES
import React from "react";
import DatePicker from "react-datepicker";
import './Compare.css'
import "react-datepicker/dist/react-datepicker.css";

 
class Compare extends React.Component {
  state = {
    startDate: new Date()
  };
 
  handleChange = date => {
    this.setState({
      startDate: date
    });
  };
 
  render() {
    const { dates, firstDate, secondDate} = this.props;
    return (
      <div style={{position:"relative" , display: "flex" , alignItems:'center' }} className="superDiv">
      <div style={{position:"relative" , display:'inlie-block' , marginRight:'10px'}}>
        <label>First Date:
        </label>
        <DatePicker
          className="firstDate"
          dateFormat="yyyy-MM-dd"
          placeholderText="Click to select a date"
          selected={new Date(firstDate)}
          onChange={(val) => this.props.changeCompareDate(val, 'firstDate')}
          minDate={new Date(dates[0].metric_date)}
          maxDate={new Date(dates[dates.length - 1].metric_date)}
        
        
       
      />
      </div>
      <div style={{position:"relative" , display:'inline-block' ,marginRight:'10px'}}>
      <label>Second Date:
      </label>
      <DatePicker
        className="secondDate"
        dateFormat="yyyy-MM-dd"
        placeholderText="Click for a date"
        selected={secondDate ? new Date(secondDate) : ''}
        onChange={(val) => this.props.changeCompareDate(val, 'secondDate')}
        disabledDays={this.props.firstDate}
        minDate={new Date(dates[0].metric_date)}
        maxDate={new Date(dates[dates.length - 1].metric_date)}
    />
    </div>
    <div>
    </div>
    </div>
    );
  }
}

export default Compare;


/*
This component is for the 2 dates like first date and second date which is shown on metrics page..

*/