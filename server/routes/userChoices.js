const express = require('express');
const router = express.Router();
const Photo = require('../models/photo');
const auth = require('../middlewares/auth');

router.post('/:photoId',auth.authenticate, (req, res) => {
  let userId = req.session.userId;
  let isLiked = req.body.isLiked;
  let isDisliked = req.body.isDisliked;

  console.log('pppppppppppppppppp')
  console.log(req.body)
  Photo.findOne({ _id: req.params.photoId }).then(photo => {
    //let alreadypresentUserId = photo.choices.some((x) => x.userId == userId);
    console.log('inside choice')
    if(isLiked && !isDisliked) {
      photo.likeCount++;
    }
    if(!isLiked && isDisliked) {
      photo.dislikeCount++;
    }

    photo.choices.push({ userId, hasLiked: isLiked, hasDisliked: isDisliked });

    photo.save().then(()=>{
      console.log(photo);
      res.status(201).send(photo);
    })
    //console.log('avg')
    
  }).catch((e) => {
      console.log(e);
      res.status(500).send({ error: "Internal Server Error" });
  });
});

module.exports = router;