import React from 'react';
import './Navigation.css';

const Navigation = ({onRouteChange, isSignedIn}) => {
  if(isSignedIn) {
    return(
      <nav className="navbar dim">
         <p onClick={() => onRouteChange('signout')} className="link">Sign Out </p> 
      </nav>
       );
      } else {
        return (
        <nav className="navbar dim center">
        <p onClick={() => onRouteChange('signin')} className="link">LogIn </p> 
        <p onClick={() => onRouteChange('register')} className="link">Register</p> 
        </nav>
        );       
      }
}

export default Navigation;