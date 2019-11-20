import React, { Component } from 'react';
import axios from 'axios';

import { Button } from '@material-ui/core';

import './NewPost.css';


class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            employee_name: '',
            employee_salary: '',
            employee_age: ''
        };
        
    }

   componentDidMount() {
       const { type, post } = this.props;
       if(type === 'update') {
        const { id, employee_age, employee_name, employee_salary } = post; 
        this.setState({
            id,
            employee_salary,
            employee_name,
            employee_age
        })
       }
       
   }
   componentDidUpdate(prevProps) {
    const { post } = this.props;
    if(post && post.id !== prevProps.post.id) {
     const { id, employee_age, employee_name, employee_salary } = post; 
     this.setState({
         id,
         employee_salary,
         employee_name,
         employee_age
     })
    }
    
}




    postDataHandler = () => {
        const { type } = this.props;
        const { id, employee_age, employee_name, employee_salary } = this.state;
        
        
        if(type === 'update') {
            axios.put("http://dummy.restapiexample.com/api/v1/update/" + id, {"name": employee_name,"salary":employee_salary,"age":employee_age})
                    .then(response => {
                        this.setState({loadedPost:response.data});
                        console.log(response);
                        if(response.status===200){
                            alert('Record updated successfully!!');
                            window.location.reload(false);
                        }
                    })
                    .catch(error => {
                        console.log("something is wrong");
                    });
                    
                
        } 
        else {
            
            axios.post("http://dummy.restapiexample.com/api/v1/create"  , {"name": employee_name,"salary":employee_salary,"age":employee_age , "id" : id})
                .then(response => {
                    //this.setState({loadedPost : response.data});
                    console.log(response);
                    alert('One Record Inserted successfully!!');
                    window.location.reload(false);
                })
                .catch(error => {
                    console.log("something is wrong");
                });
            }
        
    }

    deletePost = () => {
       
        axios.delete("http://dummy.restapiexample.com/api/v1/delete/" + this.state.id)
               .then(response => {
                   if(response.status===200){
                    alert('Record deleted successfully!!');
                    window.location.reload(false);
                   }
                 })
                .catch(error => {
                    console.log("something is wrong");
                });
    }

  

    render () {   
           
        const { type } = this.props;
        return (
            
            <div className="NewPost">
                <h1>{type === 'update' ? 'Update Post' : 'Add Post'}</h1>
                
                <label>Employee Id</label>
                <input type="text" value={this.state.id} onChange={(event) => this.setState({id: event.target.value})} />
                <label>Employee Name</label>
                <input type="text" value={this.state.employee_name} onChange={(event) => this.setState({employee_name: event.target.value})} />
                <label>Employee Salary</label>
                <input type="text" value={this.state.employee_salary} onChange={(event) => this.setState({employee_salary: event.target.value})} />
                <label>Employee Age</label>
                <input type="text" value={this.state.employee_age} onChange={(event) => this.setState({employee_age: event.target.value})} />

                <Button style={{ marginTop: '12px', marginBottom: '12px', marginRight: '12px' }} onClick={this.postDataHandler} variant="contained" color="primary">
                {type === 'update' ? 'Update Post' : 'Add Post'}
                </Button>
                    {type === 'update' && <Button style={{ marginTop: '12px', marginBottom: '12px'}} onClick={this.deletePost} variant="contained" color="secondary">
                    Delete Post
                </Button>}
            </div>
        );
    }
}

export default NewPost;