import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import './HomePage.css';
import axios from 'axios';


class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      message: '',
      userId: '',
      alreadypresentUserIndex: '',
      alreadyLiked: 'false',
      alreadyDisliked: 'false'
  };
  
}


componentDidMount() {
  //console.log(window.location)
  const promisePhotos = axios(`/api/photos`);
  const promiseUsers = axios('/api/users/me');
  Promise.all([promisePhotos, promiseUsers])
  
  .then(response => {
  //console.log(response);
  
  this.setState({photos: response[0].data});
  this.setState({userId: response[1].data._id});
  //console.log(this.state.userId);
  //console.log(this.state.photos);
  for(let i = 0;i<this.state.photos.length;i++) {

    this.setState({alreadypresentUserIndex: this.state.photos[i].choices.findIndex((a) => a.userId === this.state.userId)})
    break;
  }
   
  //console.log (this.state.alreadypresentUserIndex)            
  });
}
likeClick(obj){
  //e.preventDefault();
  //console.log(obj)
  //console.log('like console');
  fetch(`/api/userChoices/${obj._id}`, {
      method: 'POST',
      body: JSON.stringify({isLiked: true, isDisliked: false}),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(res => {
      if (res.status === 201) {
        //this.state.photos
        this.setState({alreadyLiked: 'true'});
        window.location.reload();
      }
    })
    .catch((error) => {
        this.errorMessage = error.message
        this.setState({message: this.errorMessage});
      });
  
  }

 dislikeClick(obj){
    //e.preventDefault();
    //console.log(obj)
    //console.log('dislike console');
    fetch(`/api/userChoices/${obj._id}`, {
        method: 'POST',
        body: JSON.stringify({isLiked: false, isDisliked: true}),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
      .then(res => {
        if (res.status === 201) {
          this.setState({alreadyDisliked: 'true'});
          window.location.reload();
        }
      })
      .catch((error) => {
          this.errorMessage = error.message
          this.setState({message: this.errorMessage});
        });
    
    }


  render() {
    
    
    
    return (
      
      <div className="HomePage">
        <div style={{minHeight: "calc(100vh - 31px)"}}>
        <NavBar/>
        
        <br></br>
        <div className="homePagePhotos" >
        {(this.state.photos).map((eachPhoto) => (
        
        <div className="eachPhotoDiv">
          <div>
          <img className="poster" src={eachPhoto.url} alt={eachPhoto.authorName} />
          <h4>Author: {(eachPhoto.authorName)}</h4>
          
          <div>
            {this.state.alreadyLiked==='true'?<button className="likeBtn" disabled><b>LIKE</b></button>
            :<button className="likeBtn" onClick={() => this.likeClick({isLiked: true, isDisliked: false, _id: eachPhoto._id})}><b>LIKE</b></button>
            }
            {
              this.state.alreadyDisliked==='true'?<button className="dislikeBtn" disabled><b>DISLIKE</b></button>
              :<button  className="dislikeBtn" onClick={() => this.dislikeClick({isLiked: false, isDisliked: true, _id: eachPhoto._id})}><b>DISLIKE</b></button>
              
            }
                   
          </div>
          <div>
          <b><span className='likeCount'>{(eachPhoto.likeCount)} Likes</span></b>
          <b><span className='dislikeCount'>{(eachPhoto.dislikeCount)} Dislikes</span></b>
          </div>
          </div>
          
        </div>
        )
        )
        }
        
        
        </div>
        </div>
        
      </div>
    );
  }
}

export default HomePage;