const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

router.get('/me',(req, res) => {
    User.findOne({ _id: req.session.userId }).then(user => {
        res.send(user);
    }).catch(() => {
        res.status(500).send({ error: "Internal Server Error" });
    });
});

router.get('/:userId', (req, res) => {
    User.findOne({ _id: req.params.userId }).then(user => {
        res.send(user);
    }).catch(() => {
        res.status(500).send({ error: "Internal Server Error" });
    });
});


module.exports = router;