import React ,{Component} from 'react';
import {posts} from './dummyData';
import Dialog from '@material-ui/core/Dialog';
import '../scss/FrontPage.scss';
import Calendar from './Calendar';
import moment from 'moment';



class FrontPage extends Component  {
   constructor(props) {
      super(props);
      this.state = {
        open: false,
        posts : posts,
        selectedMember: ''
      }
   }

   handleMemberInfo = (member) => {
     
   //This function handels the member information for opening of modal box
   //for the particular member
    this.setState({
      open: !this.state.open,
      selectedMember: member
    })
   }

   handleClose = () => [
     //this closes the modal box
    this.setState({
      open: false
    })
  ]

  filterByDate = (date) => {
    //this function is for filtering the member activity records on the vasis of date for the particular date 
    //when selected from calender
   
    let currentMember = posts[0].members.find(member => member.id === this.state.selectedMember.id);
   
    let currentActivity = currentMember.activity_periods.filter(period => moment(period.start_time).format('DD-MM') === moment(date).format('DD-MM'));
    this.setState({
      selectedMember: {
        ...this.state.selectedMember,
        activity_periods: currentActivity
      }
    })
  }
       
    render() {
        
        const {posts , open , selectedMember ,i } = this.state;
       
        return (
           <div className="box">
              <div className="member-list">
                <div className="common-heading">
                  <label><span>Name</span> <p>Country</p></label>
                </div>
                {
                  posts[0].members.map((member, i , id) => (
                    <div  key={i} className="member-box" onClick={() => this.handleMemberInfo(member)}>
                    <h2>
                    <label   htmlFor={'handle' + member.id}><span>{member.real_name}</span>  <p>{member.tz}</p></label>
                   </h2>
                   </div>
                  ))}
                      {open && <Dialog
                        className= 'dialogBox'
                        open={open}
                        onClose={this.handleClose}
                          > 
                          <div className="calendar-box">
                            <Calendar filterByDate={this.filterByDate}/>
                          </div>

                          <div className="selectedMember">
                            <h1>{selectedMember.real_name}</h1>
                            </div>
                            <div className="modal-header">
                                <div className="common-heading">
                                <label><span>Start Time</span> <p>End Time</p></label>
                                </div>
                            {
                            selectedMember.activity_periods.map((period) => (
                              <div key={i} className="intervals"> 
                              <h2>
                               <label><span>{period.start_time}</span>
                               <p>{period.end_time}</p></label>
                              </h2>
                              </div>
                            ))
                          }

                        </div>
                    
                    </Dialog>}
              </div>
           </div>
        );
    }
}

export default FrontPage;