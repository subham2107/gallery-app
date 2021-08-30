import React from 'react';
import NavBar from './NavBar';
import './HomePage.css';
import axios from 'axios';


class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      message: '',
  };
  
}


componentDidMount() {
  const promisePhotos = axios(`/api/photos`);
  Promise.all([promisePhotos])
  
  .then(response => {
  this.setState({photos: response[0].data});           
  });
}


likeClick(obj){
  fetch(`/api/userChoices/${obj._id}`, {
      method: 'POST',
      body: JSON.stringify({isLiked: true}),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(res => res.json())
    .then(data => {
      this.setState(prevState => {
        this.state.photos = prevState.photos;
        const index = this.state.photos.findIndex((x) => x._id === obj._id);
        this.state.photos[index].hasLiked = data.hasLiked;
        this.state.photos[index].hasDisliked = data.hasDisliked;
        this.state.photos[index].likeCount = data.likeCount;
        this.state.photos[index].dislikeCount = data.dislikeCount;
        return prevState;
    });    
    })
  
    .catch((error) => {
        this.errorMessage = error.message
        this.setState({message: this.errorMessage});
      });
  
  
}

 dislikeClick(obj) {
    
    fetch(`/api/userChoices/${obj._id}`, {
        method: 'POST',
        body: JSON.stringify({isDisliked: true}),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
      .then(res => res.json())
      .then(data => {
        
        this.setState(prevState => {
          this.state.photos = prevState.photos;
          const index = this.state.photos.findIndex((x) => x._id === obj._id);
          this.state.photos[index].hasLiked = data.hasLiked;
          this.state.photos[index].hasDisliked = data.hasDisliked;
          this.state.photos[index].likeCount = data.likeCount;
          this.state.photos[index].dislikeCount = data.dislikeCount;
          return prevState;
        });
      }
      )
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
        <div className="homePagePhotos" >
        {(this.state.photos).map((eachPhoto) => (
        
        <div className="eachPhotoDiv">
          <div>
          <img className="poster" src={eachPhoto.url} alt={eachPhoto.authorName} />
          <h4>Author: {(eachPhoto.authorName)}</h4>
          
          <div>
            
            <button className="likeBtn"  disabled={eachPhoto.hasLiked} onClick={() => this.likeClick({isLiked: true,_id: eachPhoto._id})}>LIKE</button>
            <button  className="dislikeBtn"  disabled={eachPhoto.hasDisliked} onClick={() => this.dislikeClick({isDisliked: true, _id: eachPhoto._id})}>DISLIKE</button>   
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