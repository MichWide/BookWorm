//External modules
const bcrypt = require('bcryptjs');
const passport = require('passport');

//User model
const User = require('../models/User');


module.exports = {
    //Handle login page request
    getLogin: (req, res, next) => {
        if (req.user) {
            res.redirect('/');
        } else {
            res.render('main', {
                settings: {
                    isLoggedIn: false,
                    view: 'login'
                },
                user: req.user
            });
        }
    },
    getRegister: (req, res, next) => {
        if (req.user) {
            res.redirect('/');
        } else {
            res.render('main', {
                settings: {
                    isLoggedIn: false,
                    view: 'register'
                },
                user: req.user
            });
        }

    },

    postRegister: (req, res, next) => {
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
    },

    postLogin: (req, res, next) => {
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/user/login',
            failureFlash: true
        })(req, res, next);
    },

    doLogout: (req, res, next) => {
        req.logout();
        req.flash('success_msg', "You are logged out");
        res.redirect('/user/login');
    }
}