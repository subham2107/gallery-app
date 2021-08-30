import React from 'react';
import NavBar from './NavBar';
import './LoginPage.css';


class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      messageLogin: ''
    };
  }


  onInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onLoginClick = e => {
    e.preventDefault();
    const { userName } = this.state;
    fetch('/api/sessions', {
      method: 'POST',
      body: JSON.stringify({ userName }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    
    .then((response) => {
      if (response.ok) {
        window.location = '/gallery';
      }
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
    <div className="loginPage" style={{textAlign: 'center'}}>
      <b><h3 className='signInHeader'>Sign In</h3></b>
      <br></br> 
        <form>
        <div>
          <label>Username</label>
          <br></br>
          <input className='name-input' placeholder="Enter name" name="userName" required type="text" required onInput={this.onInput} value={this.state.userName}></input>
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
