const express = require('express');
const router = express.Router();
const Photo = require('../models/photo');

router.get('/', (req, res) => {
  
  Photo.find({}).then(photo => {
      //console.log(photo);
      res.send(photo);
  }).catch(() => {
      res.status(500).send({ error: "Internal Server Error" });
  });
});

module.exports = router;