const express = require('express');
const router = express.Router();

//Initialize route handlers
const {
    getLogin,
    getRegister,
    doLogout,
    postRegister,
    postLogin
} = require('../controllers/user');

//GET 
//LOGIN PAGE
router.get('/login', getLogin);

//REGISTER PAGE
router.get('/register', getRegister);

//LOGOUT HANDLE
router.get('/logout', doLogout);

//POST
//REGISTER HANDLE
router.post('/register', postRegister);

//Login handle
router.post('/login', postLogin);

module.exports = router;