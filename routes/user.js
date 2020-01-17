const express = require('express');
const router = express.Router();
const {User} = require("../database/models");
const bcrypt = require("bcrypt");
const Sequelize = require('sequelize');
const jwt = require("jsonwebtoken");
const keys = require("../bin/keys");

const validateRegisterInput = require("../validation/register");

//login
router.post('/register', (req, res, next) => {

    //validate req.body first

    const {errors, isValid} = validateRegisterInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    let newUser = User.build({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    })

    User.findOne({
        where: Sequelize.or (
            {email: req.body.email},
            {username: req.body.username}
        )
    })
    .then(user => {

        if(user) {
            return res.status(400).json({
                foundUser: "User already exists"
            });
        }

        newUser.email = newUser.email.toLowerCase();

        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser
                .save()
                .then(user =>{
                    return res.status(200).json(user)
                })

                //TODO: Improve error handling
                .catch(err => {
                    return res.status(400).json("Error occured")
                });
            });
        });
    })

});

//login
router.post('/login', (req, res, next) => {

    //validate req.body first

    User.findOne({
        where: {username: req.body.username}
    })
    .then(user => {

        if(!user) {
            return res.status(400).json("User does not exist");
        }

        const password = req.body.password;

        // Check password
        bcrypt.compare(password, user.password)
        .then(isMatch => {

            if (isMatch) {
            // User matched
            // Create JWT Payload
                const payload = {
                    id: user.id,
                    username: user.username,
                    email: user.email
                };
    
                // Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    { expiresIn: 31556926 }, // 1 year in seconds 
                    (err, token) => {
                        return res.status(200).json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );

            } else {
            return res
                .status(400)
                .json("Incorrect Credentials");
            }
        });

    })

});

module.exports = router;
