const express = require('express');
const router = express.Router();

//GET routes
router.get('/', (req, res, next) => {
    res.render('main', {
        settings: {
            isLoggedIn: true,
            view: 'home'
        }
    });
});


module.exports = router;