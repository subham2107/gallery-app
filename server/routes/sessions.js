const express = require('express');
const router = express.Router();
const User = require('../models/user');


router.post('/', (req, res) => {
    if (!req.body) {
        res.status(400).send({error: "Name not present in request"});
        return;
    }

    let userName = req.body.userName;

    User.find({ userName }).then(user => {
        if (user.length==0){
            const freshUser = new User({ userName });
            freshUser.save().then((newUser) => {
            req.session.userId = newUser._id;
            res.status(201).send({message: "New user signed up"});
            return;
            })

        }
        else {
            
            const currentUser = user[0];
            req.session.userId = currentUser._id;
            res.status(201).send({message: "signed in"})
            
        }
         
        
        })
});

module.exports = router;