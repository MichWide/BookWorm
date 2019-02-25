const express = require('express');
const router = express.Router();

//INITIALIZE ROUTE HANDLERS
const {
    getHomepage
} = require('../controllers/global');

const {
    ensureAuthenticated
} = require('../config/auth');

//GET routes
router.get('/', ensureAuthenticated, getHomepage);

module.exports = router;