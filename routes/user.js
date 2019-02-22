const express = require('express');
const router = express.Router();

//GET routes
router.get('/', (req, res, next) => {
    res.render('home', {
        user: {
            isLoggedIn: true
        }
    });
})


module.exports = router;