const express = require('express');
const router = express.Router();

const {
    ensureAuthenticated
} = require('../config/auth');

//GET routes
router.get('/', ensureAuthenticated, (req, res, next) => {
    res.render('main', {
        settings: {
            isLoggedIn: false,
            view: 'home',
        },
        user: {
            name: req.user.username
        }
    });
});

module.exports = router;