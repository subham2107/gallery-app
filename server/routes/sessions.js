const express = require('express');
const router = express.Router();
const UserCredential = require('../models/user-credential');
const User = require('../models/user');


router.post('/', (req, res) => {
    if (!req.body) {
        res.status(400).send({error: "Name not present in request"});
        return;
    }

    let userName = req.body.userName;

    User.find({ userName }).then(user => {
        // console.log(user[0]);
        // console.log('hello')
        // if (user.length!=0) {
        //     res.status(200).send({message: "User already signed up"});
        //     console.log('Inside session1');
        //     return;
        // }
        if (user.length==0){
            console.log('Inside session2');
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

router.delete('/me', (req, res) => {
    delete req.session.userId;
    res.status(204).send();
});

module.exports = router;