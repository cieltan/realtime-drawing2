const express = require('express');
const router = express.Router();
const {User} = require("../database/models");
const bcrypt = require("bcrypt");

// Find all of the games of the season, with the homeTeam and awayTeam eager loaded;
router.post('/register', (req, res, next) => {

    //validate req.body first

    let newUser = User.build(req.body)

    //search db to see if the user already exists
    
    newUser.email = newUser.email.toLowerCase();

    // Hash password before saving in database
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
            .save()
            .then(user => res.json(user))
            .catch(err => next(err));
        });
    });

});

module.exports = router;
