const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const passport = require('passport');

//User model
const User = require('../models/User');

//GET 
//LOGIN PAGE
router.get('/login', (req, res, next) => {
    res.render('main', {
        settings: {
            isLoggedIn: false,
            view: 'login'
        }
    });
});

//REGISTER PAGE
router.get('/register', (req, res, next) => {
    res.render('main', {
        settings: {
            isLoggedIn: false,
            view: 'register'
        }
    });
});

//POST
//REGISTER HANDLE
router.post('/register', (req, res, next) => {
    const {
        username,
        email,
        password,
        password2
    } = req.body;

    let errors = [];

    //Check required fields
    if (!username || !email || !password || !password2) {
        errors.push({
            msg: 'Please fill in all fields'
        });
    }

    //Check if passwords match
    if (password !== password2) {
        errors.push({
            msg: 'Passwords do not match'
        });
    }

    //Check password length
    if (password.length < 6) {
        errors.push({
            msg: "Password is too short. It should be at least 6 characters"
        });
    }

    if (errors.length > 0) {
        console.log(errors);
        res.render('main', {
            settings: {
                isLoggedIn: false,
                view: 'register'
            },
            errors: errors,
            username: username,
            email: email,
            password: password

        });
    } else {
        User.findOne({
                email: email
            })
            .then(user => {
                if (user) {
                    errors.push({
                        msg: 'Email is already registered'
                    });
                    res.render('main', {
                        settings: {
                            isLoggedIn: false,
                            view: 'register'
                        },
                        errors: errors,
                        username: username,
                        email: email,
                        password: password

                    });
                } else {
                    const newUser = new User({
                        username,
                        email,
                        password
                    });

                    //Hash pasword
                    bcrypt.genSalt(10, (err, salt) => {
                        if (err) throw new Error;
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw new Error;
                            //Set password to hashed
                            newUser.password = hash;

                            //Save user
                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg', 'You are now registered. Please log in!');
                                    res.redirect('/user/login');
                                })
                                .catch(err => console.log(err));
                        })
                    })
                }
            })
            .catch(e => console.log('e'));
    }
});

//Login handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/user/login',
        failureFlash: true
    })(req, res, next);
})


//Logout handle
router.get('/logout', (req, res, next) => {
    req.logout();
    req.flash('success_msg', "You are logged out");
    res.redirect('/user/login');
})
module.exports = router;