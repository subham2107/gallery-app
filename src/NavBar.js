import React from 'react';
import './NavBar.css';
import './index.css';

class NavBar extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
    };
}

componentDidMount() {
  fetch('/api/users/me')
  .then(response => response.json())
  .then(user => {
      this.setState({userName: user.userName});
  });
}


onInput = event => {
  this.setState({ [event.target.name]: event.target.value });
}




render() {

  return (
<header className="navbar">
   <div className="companyLogo"><b className="logoY">Gallery App</b></div>
   <span className="login-signupp">{this.state.userName}</span>
</header>

    );
  }
}



export default NavBar;