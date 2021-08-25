import React from 'react';
import { Link } from 'react-router-dom';


import './NavBar.css';
import './index.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


class NavBar extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
    };
}

componentDidMount() {
  console.log('did mount')
  fetch('/api/users/me')
  .then(response => response.json())
  .then(user => {
      console.log(user)
      console.log('hi')
      this.setState({userName: user.userName});
      
    
    
  });
}


onInput = event => {
  this.setState({ [event.target.name]: event.target.value });
}




render() {
  
  
  //console.log(this.state.userName)


  return (
<header className="navbar">
   <div className="companyLogo"><b className="logoY">Gallery App</b></div>
   {/* {this.props.displaySearch? <div></div>:<SearchBar searchMovieResult={this.searchMovieResult}/>} */}
   <span className="login-signupp">{this.state.userName}</span>
   {/* {this.state.isPopUp?<PopUp togglePopUp={this.togglePopUp}/>:null} */}
</header>


    );
  }
}



export default NavBar;