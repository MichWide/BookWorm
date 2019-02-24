/**
 * Importing modules
 */
//Built-in
const path = require('path');

//Third party
const express = require('express');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

//Internal
const appRoutes = require('./routes/index')
const userRoutes = require('./routes/user');
require('./config/passport')(passport);


/**
 * Database configuration
 */
const mongoose = require('mongoose');

const db = require('./config/keys').MongoURI;

mongoose.connect(db, {
        useNewUrlParser: true
    })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

/**
 * Server configuration
 */
//Initializing express app
const app = express();

//Setting up static path
app.use(express.static(path.join(__dirname, 'public')));

//Setting up template engine and views
app.set('view engine', 'ejs');
app.set('views', 'views');

////Setting up middleware

//Bodyparser
app.use(bodyParser.urlencoded({
    extended: false
}));

//Express session
app.use(session({
    secret: 'supersecret',
    resave: true,
    saveUninitialized: true
}));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Connect flash
app.use(flash());

//Global Vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

//Setting up routes
app.use('/user', userRoutes);
app.use(appRoutes);

//Kickstarting the server
const PORT = process.env.PORT || 8000;
app.listen(PORT);