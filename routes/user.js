const express = require('express');
const router = express.Router();
const {User} = require("../database/models");
const bcrypt = require("bcrypt");
const Sequelize = require('sequelize');

// Find all of the games of the season, with the homeTeam and awayTeam eager loaded;
router.post('/register', (req, res, next) => {

    //validate req.body first

    let newUser = User.build(req.body)

    User.findOne({
        where: Sequelize.or (
            {email: req.body.email},
            {username: req.body.username}
        )
    })
    .then(user => {

        if(user) {
            return res.status(400).json("User already exists");
        }

        newUser.email = newUser.email.toLowerCase();

        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser
                .save()
                .then(user => res.status(200).json(user))

                //TODO: Improve error handling
                .catch(err => next(err));
            });
        });
    })

});

module.exports = router;
