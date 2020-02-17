import React,{Component} from 'react';
import Calendar from './Calendar';
import {Bar} from 'react-chartjs-2';
import { Button } from '@material-ui/core';
import './Chart.css';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import SearchIcon from '@material-ui/icons/Search';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { API } from './constant';
import moment from 'moment';
import Header from './Header';
import withAuth from './withAuth'
import AuthService from './AuthService';
import GetAppIcon from '@material-ui/icons/GetApp';
import {CSVLink} from "react-csv";
import Compare from './Compare';
import CompareBar from './CompareBar';



var self = null;
const  getTotalChartCount = (data, index) => data[Object.keys(data)[index]].total_count; // for toolTip

const Auth = new AuthService();
class Chart extends  Component {
    constructor(props) {
        super(props);
        this.state = {
            totalData: {},
            currentChart: 'dates',
            selectedInstances: [],
            startDate: props.history.location.state ? props.history.location.state.startDate ? this.props.history.location.state.startDate : new Date(moment().subtract(9, 'days')) : new Date(moment().subtract(9, 'days')),
            endDate: props.history.location.state ? props.history.location.state.endDate ? this.props.history.location.state.endDate : new Date(moment().subtract(2, 'days')) : new Date(moment().subtract(2, 'days')),
            compareChart: false
        };
        this.chartReference = React.createRef();
    }
    
    //this method is execute when the data is fetched from api after that it will renders with the updates data
        componentDidMount() {
            //console.log('check prrrrr', this.props);
            
            axios.get(`${API}/fetchsearchmetrics/?from=${moment(this.state.startDate).format('YYYY-MM-DD')}&to=${moment(this.state.endDate).format('YYYY-MM-DD')}`)
                  
              
                 .then(response => {
                    //console.log('check response ===>', response)
                    this.setState({
                        totalData: this.getDatesData(response.data),
                        instances: response.data
                    });
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
       // console.log('mounted')
        
     //logic for metric_date when individual date is clicked
    getDatesData = (instances = this.state.instances) => {
        return instances.reduce((acc, instance) => {
            return {
                ...acc,
                [instance.metric_date]: {
                    total_count: this.getTotalCount(instance, 'searches'),
                    total_searches: this.getTotalCount(instance, 'searches') - this.getTotalCount(instance, 'follow_on'),
                    total_clicks: this.getTotalCount(instance, 'clicks'),
                    total_follow_on: this.getTotalCount(instance, 'follow_on')
                } 
            }
        }, {})
    }
    


    handleLogout = () => { //This method handels the logout and takes to the initial login page 
        Auth.logout()
          .then(res => {
            this.props.history.replace('/login');
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
      

      //logic for click events only inside the labels and fetching the total searches , clicks , followON , when the particular date 
      //level is clicked
      handleIndividualMetrics = (data) => {
                if(data.length > 0) {
                const { totalData, instances } = this.state;
                let selectedDate = Object.keys(totalData)[data[0]._index];
                const selectedMetrics = instances.find(instance => instance.metric_date === selectedDate).metric;
                const myData = this.getMetricsData(Object.keys(selectedMetrics), selectedMetrics);
                this.setState({
                    totalData: myData,
                    currentChart: 'metrics',
                    instanceList: Object.keys(selectedMetrics),
                    selectedMetrics,
                    dateHeader: selectedDate,
                    firstDate: selectedDate
                })
          }
          
        
      }
  
      //  this method is for the getting the counts value of the searches , clicks and follow_on , it takes 
      // two parameter as data and the counts
      getTotalIndividualCount = (data, value) => data.reduce((acc, item) => acc + item[value], 0)

      // this method is for the data selected in dropdown list 
       handleSelect = event => {
        this.setState({
            selectedInstances: event.target.value
        })
      };
      
      //this is for the urls which are selected from the dropdown and fetching the data of the selected urls
      getInstanceResult = () => {
        const { selectedMetrics, selectedInstances } = this.state;
        this.setState(
            {
                totalData: this.getMetricsData(Object.keys(selectedMetrics).filter(item => selectedInstances.includes(item)), selectedMetrics),
                isFetched: true

            }
        )
      }

      //this method is for the particular dates selected and taking the instances from the particular dates and from that
      // taking the total searches , total clicks and total follow on
      getMetricsData = (data, selectedMetrics) => data.reduce((acc, instance) => ({
            ...acc,
            [instance]: {
                total_count: this.getTotalIndividualCount(selectedMetrics[instance], 'searches') ,
                total_searches: this.getTotalIndividualCount(selectedMetrics[instance], 'searches') - this.getTotalIndividualCount(selectedMetrics[instance], 'follow_on'),
                total_clicks: this.getTotalIndividualCount(selectedMetrics[instance], 'clicks'),
                total_follow_on: this.getTotalIndividualCount(selectedMetrics[instance], 'follow_on')
            } 
      }), {});


      //for handelling individual instances and taking the proxy values
      handleIndividualInstances = (data) => {
          if(data.length > 0) {
            const { selectedMetrics } = this.state;
            let selectedInstance = selectedMetrics[Object.keys(selectedMetrics)[data[0]._index]];
            const myData = selectedInstance.reduce((acc, instance) => {  // use dummyProxy in place of selectedInstance for checking the proxy data
            if(acc[instance.proxy]){ 
                return {
                    ...acc,
                    [instance.proxy]: {
                        ...acc[instance.proxy],
                        total_count: (acc[instance.proxy].total_searches + instance.searches) ,
                        total_searches: (acc[instance.proxy].total_searches + instance.searches) - (acc[instance.proxy].total_follow_on + instance.follow_on),
                        total_clicks: acc[instance.proxy].total_clicks + instance.clicks,
                        total_follow_on: acc[instance.proxy].total_follow_on + instance.follow_on
                    }
                }
            } else {
                
                return {
                    ...acc,
                    [instance.proxy]: {
                        total_count:instance.searches ,
                        total_searches: instance.searches - instance.follow_on,
                        total_clicks: instance.clicks,
                        total_follow_on: instance.follow_on
                    }
                }
               
            }
        }, {});

       
        //for handelling the state 
        this.setState({
            totalData: myData,
            currentChart: 'instances',
            selectedInstances: [],
            instanceHeader: this.state.instanceList[data[0]._index]
        })
          }
        
      }


      //for handeling the previous button
      handlePrevious = () => {
          if(this.state.currentChart === 'instances') {
            const myData = this.getMetricsData(Object.keys(this.state.selectedMetrics), this.state.selectedMetrics);
              this.setState({
                  currentChart: 'metrics',
                  totalData: myData
              })
          } else if(this.state.currentChart === 'metrics') {
              this.setState({
                  currentChart: 'dates',
                  totalData: this.getDatesData(),
                  selectedInstances: [],
                  compareChart: false,
                  isFetched: false,
                  secondDate: ''
              })
          }
      }
       
      //for the csv file to download 
      getCSVData = (id) => {
        const { totalData } = this.state;
           return Object.keys(totalData).reduce((acc,val) => {
               //console.log('hi',acc)
              return [
                  ...acc,
                  {
                      [id]: val,
                      Total_Searches: totalData[val].total_count,
                      Follow_on: totalData[val].total_follow_on,
                      Searches: totalData[val].total_searches,
                      Clicks: totalData[val].total_clicks,
                      
                  }
              ]
            }, [])
    }

    

      //for getting the color dynamically
      getColor = (color) => [...Array(Object.keys(this.state.totalData).length)].map(item => color)
      
      //for handelling the metrics button
      handleMetricButton = () => {
        
       this.props.history.push({ pathname: '/', state: { startDate: this.state.startDate, endDate: this.state.endDate } })
  
      }
       
      
      //This method is for the set the data which we are retrieving from the Api on the chart
      setInstanceData = (data) => {
          this.setState({
              instances: data,
              totalData: this.getDatesData(data)
          })
      }
      
      // this is for changing the dates which i am getting from the calendar widget
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

      //this is for the dates which we have to change the dates in the compare calendar widget
      changeCompareDate = (value, id) => {
          //console.log('bnbnbnb',value)
        this.setState({
            [id]: moment(value).format('YYYY-MM-DD')
        })
      }
      

      //this method is for the comparision between 2 dates
      handleChartComparison = () => {
          const { firstDate, secondDate } = this.state;
          if(firstDate && secondDate){
            this.setState({
                compareChart: true
            }, () => {
                this.forceUpdate()
            })
          }
          
      }
      
      
      //This method is for the fetching the data of the particular date
      getCompareDate = () => {
          const { secondDate, instances, selectedInstances } = this.state;
          const selectedMetrics = instances.find(instance => instance.metric_date === secondDate).metric;
          //console.log('chceeee', selectedMetrics);
        return this.getMetricsData(Object.keys(selectedMetrics).filter(item => selectedInstances.includes(item)), selectedMetrics)
      }
     

   render(){
       self = this;
       const { currentChart, instanceList, selectedInstances, instanceHeader,totalData, firstDate, secondDate, compareChart, instances, isFetched } = this.state;
       //console.log('check chart state', this.state);
       
       const chartData = {
        
          
           labels: [...Object.keys(this.state.totalData)],
           
           datasets: [
               {
                   label: 'Clicks',
                   stack: 1,
                   backgroundColor: this.getColor('rgba(255, 99, 132, 0.2)'),
                   borderColor: this.getColor('rgba(255, 99, 132, 1)'),
                   borderWidth: 2,
                   hoverBorderWidth: 4,
                   data: Object.keys(this.state.totalData).map(item => this.state.totalData[item].total_clicks)
               },
               {           
                label: 'Follow-On',
                stack:2,
                backgroundColor: this.getColor('rgba(255, 206, 86, 0.2)'),
                borderColor: this.getColor('rgba(255, 206, 86, 1)'),
                borderWidth: 2,
                hoverBorderWidth: 4,
                data: Object.keys(this.state.totalData).map(item => this.state.totalData[item].total_follow_on),
               },
               {
                label: 'Searches',
                stack: 2,
                backgroundColor: this.getColor('rgba(54, 162, 235, 0.2)'),
                borderColor: this.getColor('rgba(54, 162, 235, 1)'),
                borderWidth: 2,
                hoverBorderWidth: 4,
                data: Object.keys(this.state.totalData).map(item => this.state.totalData[item].total_searches),
                      
                
            },
            
           
           ],
           
                options: {
                    
                    
                    
                    events: ['click'],
                }
    
       }
       //console.log(typeof(totalData))
       return(
           <div>
               <Header handleLogout={this.handleLogout} user={this.props.user}/>

               
               <div className='date'>{currentChart === 'dates' ? '' : currentChart === 'metrics' ? firstDate : instanceHeader}</div>

               
        { currentChart !== 'dates' && <Button type="button" style={{marginTop:'20px',backgroundColor:'#ff8000', marginLeft:'10px'}} onClick={this.handlePrevious} variant="contained">Previous</Button>

        } 
        
       {currentChart === 'metrics' && <div >
           <div>
              <Compare dates={instances} changeCompareDate={this.changeCompareDate} firstDate={firstDate} secondDate={secondDate}/>
              <div className="compareButton">
                   <Button  type="compareButton" disabled={!firstDate || !secondDate || selectedInstances.length > 4 || selectedInstances.length === 0 || !isFetched} style={{backgroundColor:'#ff8000', marginLeft:'10px'}}  variant="contained" onClick={this.handleChartComparison}>Compare</Button> 
                   </div>
                   </div>
           </div>}
        
        {
        
        currentChart === 'dates' && <div >
            <div className="middleButton">
          <Button type="chartButton"  style={{backgroundColor:'#ff8000', marginLeft:'10px', marginRight:'10px'}} onClick={this.handleMetricButton} variant="contained">Metrics</Button>  
          <Button type="chartButton" disabled={true} style={{backgroundColor:'#ff8000', marginLeft:'10px'}}  variant="contained">Charts</Button> 
          </div>
          {totalData && <Button
                          
                          style={{backgroundColor:'#ff8000', marginRight:'10px' , marginLeft:'260px' , marginTop: '30px'}}
                          variant="contained"
                          color="secondary"
                          endIcon={<GetAppIcon style={{backgroundColor:'purple'}}/>}
                              >
                             {<CSVLink data={this.getCSVData(currentChart === 'dates' ? 'Date' : 'URL')}>Export</CSVLink>}
      
                          </Button>}
                          
          
          </div> 
         
          
          }
              
         
           {currentChart === 'dates' && <div><Calendar  changeStartDate={this.changeStartDate} changeEndDate={this.changeEndDate} history={this.props.history} setInstanceData={this.setInstanceData}/></div>}
           {currentChart === 'metrics' && <div className='metricsDiv'style={{ display: 'flex', alignItems: 'center'}}>
           

           
           <div className='instanceList' >
                <FormControl >
                <InputLabel style={{marginLeft:'43px' }} id="demo-mutiple-chip-label">URL</InputLabel>
                <Select
                    className='instanceList'
                    labelId="demo-mutiple-chip-label"
                    id="demo-mutiple-chip"
                    multiple
                    value={selectedInstances}
                    onChange={this.handleSelect}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={selected => (
                        <div>
                        {selected.map(value => (
                            <Chip key={value} label={value} />
                        ))}
                        </div>
                        )}
                >
                    {instanceList.map(name => (
                        <MenuItem key={name} value={name}>
                        {name}
                        </MenuItem>
                    ))}
                </Select>
                    </FormControl>
                    </div>
                    <div className='chartInstanceButton' >
                    <Button
                        
                    style={{backgroundColor:'#ff8000', marginRight:'20px'}}
                    variant="contained"
                    color="secondary"
                    endIcon={<SearchIcon/>}
                    onClick={this.getInstanceResult}
                        >
                    Fetch
                    </Button>
                    </div>
                    <div>
                    {totalData && <Button
                        
                        style={{backgroundColor:'#ff8000', marginRight:'10px', float:'rigth'}}
                        variant="contained"
                        color="secondary"
                        endIcon={<GetAppIcon style={{backgroundColor:'purple'}}/>}
                            >
                           {<CSVLink data={this.getCSVData(currentChart === 'dates' ? 'Date' : 'URL')}>Export</CSVLink>}
    
                        </Button>} 
                    </div>
                    
                        </div>}
                        <div>
                            <div >
                            <Bar
                            
                            ref={this.chartReference}
                            
                            data={chartData}
                            width={100}
                            height={30}
                            options={{
                                maintainAspectRatio: true,
                                responsive: true,
                                tooltips: {
                                    callbacks: {   //function for adding tooltip overriding 2 datas
                                        label: function(toolTip) {
                                            
                                            return toolTip.datasetIndex === 2 ? [`Searches: ${toolTip.yLabel}`, `Total: ${getTotalChartCount(self.state.totalData, toolTip.index)}`] 
                                            : toolTip.datasetIndex === 1 ? [`Follow on: ${toolTip.yLabel}`]
                                            :'Clicks: '+toolTip.yLabel
                                        }
                                    }
                                },
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            fontSize: 15,
                                            fontColor: 'blue'
                                            
                                        }
                                    }],
                                    xAxes: [{
                                        ticks: {
                                            fontSize: 15,
                                            fontColor: 'blue'
                                            
                                        }
                                    }]
                                },
                                legend:{
                                    labels: {
                                        fontColor:'blue'
                                    }
                                }
                                

                            }}
                            
                            onElementsClick={currentChart === 'dates' ? this.handleIndividualMetrics : currentChart === 'metrics' ? this.handleIndividualInstances : undefined}
                            />
                            {compareChart && <div className='propsDate'>
                        <strong style={{alignItems:'right'}}>{firstDate}</strong> 
                     </div>}
                            </div>
                            {compareChart && <div  >
                                <CompareBar date1={this.state.firstDate} date={this.state.secondDate} totalData={this.getCompareDate()}/>
                            </div>}
                        </div>
                        </div>
                    );
   }
}
export default withRouter(withAuth(Chart));



/*
1- handling the state
2- when clicked outside the label it was giving error it was handelled 
3- tooltip callback function is called for overriding 2 datas
4- state with buttons are handelled,
5- for toolTIp datasetIndex value is based on the the labels added like for follow o it takes datasetIndex value as 1 and
    for searches and total it takes datasetIndex value as 2




    This component is for the charts which are rendered on the page ..
 
*/



