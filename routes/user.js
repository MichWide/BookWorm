const express = require('express');
const router = express.Router();

//GET routes
router.get('/login', (req, res, next) => {
    res.render('main', {
        settings: {
            isLoggedIn: false,
            view: 'login'
        }
    });
});

router.get('/register', (req, res, next) => {
    res.render('main', {
        settings: {
            isLoggedIn: false,
            view: 'register'
        }
    });
});


module.exports = router;