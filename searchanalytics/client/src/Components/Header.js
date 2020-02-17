import React from 'react';
import { Button } from '@material-ui/core';

const Header = ({ user, handleLogout }) => (
    <div className="topNav">
    <div style={{position:'relative',float:'left',flexGrow:'1'}}>
      <h2 style={{marginLeft:'22px'}}>Welcome {user}</h2>
    </div>
    <Button className="logoutButton" style={{backgroundColor:'#ff8000', marginRight:'20px'}} type="button"  onClick={handleLogout} variant="contained">Logout</Button>
</div>
)

export default Header;