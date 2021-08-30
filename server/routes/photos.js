const express = require('express');
const router = express.Router();
const Photo = require('../models/photo');

router.get('/', (req, res) => {
  
  Photo.find().then(photos => {
      
      let userId = req.session.userId;
      let alreadypresentUserIdIndex;
      let hasLiked = false;
      let hasDisliked = false;
     
      const response = photos.map(photo => {
        alreadypresentUserIdIndex = photo.choices.findIndex((x) => x.userId.toString() === userId.toString());
        let obj = JSON.parse(JSON.stringify(photo))
        if(alreadypresentUserIdIndex!==-1) {
          hasLiked = photo.choices[alreadypresentUserIdIndex].hasLiked;
          hasDisliked = photo.choices[alreadypresentUserIdIndex].hasDisliked;
          obj = {...obj, hasLiked, hasDisliked};
        }
        return obj;

      })
      
      res.send(response);
  }).catch(() => {
      res.status(500).send({ error: "Internal Server Error" });
  });
});

module.exports = router;