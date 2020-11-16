import React from 'react';
import './SignIn.css';

class SignIn extends React.Component {

 constructor(props) {
   super(props);
   this.state = {
     signinEmail: '',
     signinPassword: ''
   }
 }

  onEmailChange = (event) => {
    event.preventDefault();
    this.setState({signinEmail: event.target.value});
  }

  onPasswordChange = (event) => {
    event.preventDefault();
    this.setState({signinPassword: event.target.value});
  }

  onsubmitSignIn = (event) => {
    event.preventDefault();
    fetch('http://localhost:3000/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signinEmail,
        password: this.state.signinPassword
      })
    })
    .then(response => response.json())
    .then(user => {
      if(user.id) {
        this.props.loadUser(user);
        this.props.onRouteChange('home');
      }
    })

  }

  render() {
    const { onRouteChange } = this.props;
    return (
      <div className="containerr center" id="container">
      <div className="form-container log-in-container">
        <form className="signinform" action="/">
          <h1 className="signinheader">LogIn</h1>
          <input onChange={this.onEmailChange}
          type="email" placeholder="Email" className="inputt" 
          required
          />
          <input onChange={this.onPasswordChange} 
          type="password" placeholder="Password" className="inputt" 
          required
          />
          <button className="signinbutton"
           onClick = {this.onsubmitSignIn}>
           Log In</button>
          <p onClick = {() => onRouteChange('register')} className="signuptext">Signup here</p>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-right">
            <h1>FACE RECOGNITION</h1>
            <p className="signintext">This Magic tool will detect your faces in your pictures. Give it a try!</p>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default SignIn;