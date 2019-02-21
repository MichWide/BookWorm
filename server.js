/**
 * Importing modules
 */
//Built-in
const path = require('path');

//Third party
const express = require('express');
const bodyParser = require('body-parser');

//Internal
const userRoutes = require('./routes/user');

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

//Setting up middleware
app.use(bodyParser.urlencoded({
    extended: false
}));

//Setting up routes
app.use(userRoutes);


//Kickstarting the server
const PORT = process.env.PORT || 8000;
app.listen(PORT);