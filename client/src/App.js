import React, { Component } from 'react';
import AuthService from './Components/AuthService';
import withAuth from './Components/withAuth';
import { Button } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const Auth = new AuthService();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    
    
  }
  handleLogout = () => { //This method handels the logout and takes to the initial login page 
    Auth.logout()
      .then(res => {
        this.props.history.replace('/login');
      })
  }

  render() {    //This render method consist of appbar in dashboard page( after the login page ) displaying the user's name which is stored in the local storage
                
    return (
        <div>
          <AppBar position="static">
         <Toolbar>
          <IconButton edge="start"  color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6"style={{textAlign: "center"}}>Welcome {this.props.user}</Typography>
          <Button type="button" style={{position: 'relative' , right: '-1490px'}} onClick={this.handleLogout} variant="contained" color="secondary">Logout</Button>
          </Toolbar>
         </AppBar>
        </div>
    
    );
  }
}

export default withAuth(App);

/*
This javascript file consists of render method which renders the Login component . This App extends the 
Component class and React class.Inside the Login component there is class cmponent

*/