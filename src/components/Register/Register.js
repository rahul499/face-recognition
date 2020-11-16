import React from 'react';
import './Register.css';

class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      registerEmail: '',
      registerPassword: '',
      registerName: ''
    }
  }
 
   onNameChange = (event) => {
    event.preventDefault();
    this.setState({registerName: event.target.value});
   }


   onEmailChange = (event) => {
     event.preventDefault();
     this.setState({registerEmail: event.target.value});
   }
 
   onPasswordChange = (event) => {
     event.preventDefault();
     this.setState({registerPassword: event.target.value});
   }

   onsubmitRegister = (event) => {
    event.preventDefault();
    fetch('http://localhost:3000/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.registerEmail,
        password: this.state.registerPassword,
        name: this.state.registerName
      })
    })
    .then(response => response.json())
    .then(user => {
      if(user.id) {
        this.props.loadUser(user) 
        this.props.onRouteChange('home');
      }
    })
  }

  render() {
    return (
        <div id="login-box">
        <div className="left">
          <h1 className="registerheader">Sign Up</h1>
          <input 
          onChange = {this.onNameChange}
          type="text" name="username" 
          placeholder="Username" className="registertext" 
          required
          />
          <input 
          onChange = {this.onEmailChange}
          type="text" name="email" 
          placeholder="E-mail" className="registertext" 
          required
          />
          <input 
          onChange = {this.onPasswordChange}
          type="password" name="password" 
          placeholder="Password" className="registertext" 
          required
          />
          
          <input 
          type="submit" name="signup_submit" className="register"
          onClick = {this.onsubmitRegister}
          value="Sign me up" />
        </div> 
        <div className="right">
          <span className="loginwith">Sign in with<br />social network</span>
          
          <button className="social-signin facebook">Log in with facebook</button>
          <button className="social-signin twitter">Log in with Twitter</button>
          <button className="social-signin google">Log in with Google+</button>
        </div>
        <div className="or">OR</div>
      </div>
    );
  }
}

export default Register;