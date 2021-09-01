import React from 'react';
import NavBar from './NavBar';
import './LoginPage.css';


class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      messageLogin: ''
    };
  }


  onInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onLoginClick = e => {
    e.preventDefault();
    const { userName, password } = this.state;
    fetch('/api/sessions', {
      method: 'POST',
      body: JSON.stringify({ userName, password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    
    .then((response) => {
      if (response.ok) {
        window.location = '/gallery';
      }
      return response.json().then((body) => {
        throw new Error(body.error)
      })
    })
    .catch((error) => {
      this.errorMessage = error.message
      this.setState({messageLogin: this.errorMessage});
    });
    
  }



  render() {
    return (
    <div>
      <NavBar/>
    <div className="loginPage" >
      <h3 className='signInHeader'>Sign In</h3>
      {this.state.messageLogin? <span className ='error-span'>{this.state.messageLogin}</span> : null} 
        <form>
          <div className = 'form-data'>
        <div>
          <label className='userName-label'>Username</label>
          <br></br>
          <input className='name-input' placeholder="Enter name" name="userName" required type="text" required onInput={this.onInput} value={this.state.userName}></input>
        </div>
        <div>
        <label className='password-label'>Password</label>
          <br></br>
          <input className='password-input' placeholder="Enter password" name="password" required type="password" onInput={this.onInput} value={this.state.password}></input>
        </div>
        </div>
          <div>
            <input className='form-login-btn'  type="submit" onClick={this.onLoginClick} value="Sign in"></input>
          </div>
          
        </form>

      </div> 
  </div>
    );
  }
  
}

export default LoginPage;
