//User model
const User = require('../../../models/User');
const bcrypt = require('bcryptjs');


const createNewUser = function (data, errors) {
    const {
        username,
        email,
        password
    } = data;

    User.findOne({
            email: data.email
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
        .catch(e => console.log(e));
}

module.exports = createNewUser;