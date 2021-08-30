const express = require('express');
const router = express.Router();
const Photo = require('../models/photo');
const auth = require('../middlewares/auth');

router.post('/:photoId',auth.authenticate, (req, res) => {
  let userId = req.session.userId;
  let isLiked = req.body.isLiked;
  let isDisliked = req.body.isDisliked;
  

  Photo.findOne({ _id: req.params.photoId }).then(photo => {
    let alreadypresentUserId = photo.choices.findIndex((x) => x.userId == userId);
    let hasLiked = false;
    let hasDisliked = false;
    
    if(alreadypresentUserId!==-1) {
      hasLiked = photo.choices[alreadypresentUserId].hasLiked || isLiked;
      hasDisliked = photo.choices[alreadypresentUserId].hasDisliked || isDisliked;

      photo.choices[alreadypresentUserId].hasLiked = hasLiked;
      photo.choices[alreadypresentUserId].hasDisliked = hasDisliked;
         
    }
    else {
      if(isLiked) {
        hasLiked = true;
        photo.choices.push({ userId, hasLiked });
      }
      else if(isDisliked) {
        hasDisliked = true;
        photo.choices.push({ userId, hasDisliked });
      }
    }
    photo.likeCount = photo.choices.filter(choice=> choice.hasLiked).length;
    photo.dislikeCount = photo.choices.filter(choice=> choice.hasDisliked).length;   
    

    photo.save().then(()=>{
      res.status(201).send({...JSON.parse(JSON.stringify(photo)), hasLiked, hasDisliked});
    })
    
  }).catch((e) => {
      console.log(e);
      res.status(500).send({ error: "Internal Server Error" });
  });
});

module.exports = router;