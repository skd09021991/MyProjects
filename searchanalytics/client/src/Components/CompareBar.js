import React,{Component} from 'react';
import {Bar} from 'react-chartjs-2';
import './CompareBar.css';

let that = null;
const  getTotalChartCount = (data, index) => data[Object.keys(data)[index]].total_count; // for toolTip

class CompareBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            
        };
        
        
    }
    getColor = (color) => [...Array(Object.keys(this.props.totalData).length)].map(item => color)

    render(){
        that = this;
        const { totalData } = this.props;
        
        //console.log('check dddddd', this.props)
        
        const chartData = {
         
           
            labels: [...Object.keys(totalData)],
            
            datasets: [
                {
                    label: 'Clicks',
                    stack: 1,
                    backgroundColor: this.getColor('rgba(255, 99, 132, 0.2)'),
                    borderColor: this.getColor('rgba(255, 99, 132, 1)'),
                    borderWidth: 2,
                    hoverBorderWidth: 4,
                    data: Object.keys(totalData).map(item => totalData[item].total_clicks)
                },
                {           
                 label: 'Follow-On',
                 stack:2,
                 backgroundColor: this.getColor('rgba(255, 206, 86, 0.2)'),
                 borderColor: this.getColor('rgba(255, 206, 86, 1)'),
                 borderWidth: 2,
                 hoverBorderWidth: 4,
                 data: Object.keys(totalData).map(item => totalData[item].total_follow_on),
                },
                {
                 label: 'Searches',
                 stack: 2,
                 backgroundColor: this.getColor('rgba(54, 162, 235, 0.2)'),
                 borderColor: this.getColor('rgba(54, 162, 235, 1)'),
                 borderWidth: 2,
                 hoverBorderWidth: 4,
                 data: Object.keys(totalData).map(item => totalData[item].total_searches),
                       
                 
             },
             
            
            ],
            
                 options: {
                     
                     
                     
                    //  events: ['click'],
                 }
     
        }
        //console.log(typeof(totalData))
        return(
           
                         <div >
                             
                             <Bar
                             className='chartContainer'
                             data={chartData}
                             width={100}
                             height={30}
                             options={{
                                 maintainAspectRatio: true,
                                 responsive: true,
                                 tooltips: {
                                     callbacks: {   //function for adding tooltip overriding 2 datas
                                         label: function(toolTip) {
                                             
                                             return toolTip.datasetIndex === 2 ? [`Searches: ${toolTip.yLabel}`, `Total: ${that.props.totalData && getTotalChartCount(that.props.totalData, toolTip.index)}`] 
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
                             
                             
                             />
                             <div className='propsDate'>
                        <strong style={{alignItems:'right'}}>{this.props.date}</strong> 
                     </div>
                    
                         </div>
                         
                    
                         
                     );
    }
}

export default CompareBar;


/*
This component is basically for the comparision between 2 dates which is selected by the user and this component 
will be shown in the half part of the rendered page.. it contains the bar graph data which is to be render on 
the half page . It contains only specific day data which is to be rendered.

*/