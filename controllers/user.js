//External modules
const passport = require('passport');

//Requiring helper methods
const verifyPassword = require('./middleware/registration/verifyPassword');
const createNewUser = require('./middleware/registration/createNewUser');



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
    //Handle register page request
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

    //Handle user registration request
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

        //Check if passwords are valid and do match
        errors.push(...verifyPassword(password, password2));

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
            createNewUser(req.body, errors);
        }
    },

    //User login request
    postLogin: (req, res, next) => {
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/user/login',
            failureFlash: true
        })(req, res, next);
    },

    //Logout handle
    doLogout: (req, res, next) => {
        req.logout();
        req.flash('success_msg', "You are logged out");
        res.redirect('/user/login');
    }
}