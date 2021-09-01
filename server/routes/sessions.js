const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');

router.post('/', (req, res) => {
    if (!req.body) {
        res.status(400).send({error: "Enter email-Id"});
        return;
    }

    const { emailId, userName, password } = req.body;

    if (!emailId) {
        res.status(400).send({error: "Enter email-Id"});
        return;
    }

    if (!userName) {
        res.status(400).send({error: "Enter username"});
        return;
    }

    if (!password) {
        res.status(400).send({error: "Enter password"});
        return;
    }

    User.find({ emailId }).then(user => {
        if (user.length==0){
            const hash = bcrypt.hashSync(password);
            const freshUser = new User({ emailId, userName, password: hash });
            freshUser.save().then((newUser) => {
            req.session.userId = newUser._id;
            res.status(201).send({message: "New user signed up"});
            return;
            })

        }
        else {
            if(user[0].userName !== userName) {
                res.status(400).send({error: "Incorrect username"});
                return;
            }

            const match = bcrypt.compareSync(password, user[0].password);

            if (!match) {
                res.status(400).send({error: "Incorrect password"});
                return;
            }
            
            const currentUser = user[0];
            req.session.userId = currentUser._id;
            res.status(201).send({message: "Signed in"})
            
        }
         
        
        }).catch(() => {
            res.status(500).send({ error: "Internal Server Error" });
        });
});

module.exports = router;