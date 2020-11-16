
import React, { Component } from 'react';
import './App.css';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Navigation from './components/Navigation/Navigation';
import CompanyLogo from './components/CompanyLogo/CompanyLogo';
import ImageForm from './components/ImageForm/ImageForm';
import Ranker from './components/Ranker/Ranker';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';



const initialState = {
  input: '',
  imageUrl: '',
  box: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
    }})
    console.log(this.state.user);
  }

  calculateFaceLocation = (data) => {
     const faceData = data.outputs[0].data.regions[0].region_info.bounding_box;
     const image = document.getElementById('inputimage');
     const width = Number(image.width);
     const height = Number(image.height);
     return {
        leftCol: faceData.left_col * width,
        topRow: faceData.top_row * height,
        rightCol: width - (faceData.right_col * width),
        bottomRow: height - (faceData.bottom_row * height)
     }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (e) => {
    this.setState({input: e.target.value});
  }

  onButtonSubmit = () => {
  this.setState({imageUrl: this.state.input});
   fetch('http://localhost:3000/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
      input: this.state.input
       })
    })
    .then(response => response.json())
    .then(response => {
      if(response) {
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
        .catch(console.log)

      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState(initialState)
    } else if(route==='home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }


  render() {
  const { isSignedIn, imageUrl, route, box, user } = this.state;
  return (
  <div className="App">
      <Navigation onRouteChange={this.onRouteChange} isSignedIn = {isSignedIn} />
      { route === 'home' 
      ? <div>
          <CompanyLogo />
          <Ranker name ={user.name} entries={user.entries} />
          <ImageForm onInputChange={this.onInputChange} 
            onButtonSubmit={this.onButtonSubmit}
           />
           <FaceRecognition 
            box={box}
            imageUrl = {imageUrl} />
         </div>
        : (
             route === 'signin' ?
            <SignIn loadUser = {this.loadUser} 
            onRouteChange={this.onRouteChange} />
          : <Register loadUser = {this.loadUser} 
            onRouteChange={this.onRouteChange} />
        )
      }
    </div>
   );
  }
}

export default App;
