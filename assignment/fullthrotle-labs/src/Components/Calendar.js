import React,{Component} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../scss/calendar.scss';

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
          
        };
      }
     
      handleChange = date => {
        
        this.setState({
          startDate: date
        });
        this.props.filterByDate(date);
      };
    render(){
        return(
            <div className="calendar">
              <DatePicker
                className="singleDatePicker"
                placeholderText="Click to select a date"
                dateFormat="dd/MM/yyyy"
                selected={this.state.startDate}
                onChange={this.handleChange} //only when value has changed
                />
            </div>
        );
    }
}

export default Calendar;