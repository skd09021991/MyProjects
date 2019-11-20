import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Button from '@material-ui/core/Button';

import './Post.css';

const post = (props) => (
  
    <Card className="Post" onClick={props.clicked}>
    <CardActionArea>
      
      <CardContent>
        <h1>Employee Id : {props.id}</h1>
        <h2 className="post_emp_name">Employee Name : {props.employeeName}</h2>
        <h3>Employee Salary : {props.employeeSalary}</h3>
        <h4>Employee Age : {props.employeeAge}</h4>
       
      </CardContent>
    </CardActionArea>
    <CardActions>
      <Button size="small" color="primary">
        Update
      </Button>
      <Button size="small" color="primary">
        Delete
      </Button>
    </CardActions>
  </Card>
);

export default post;