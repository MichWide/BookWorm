module.exports = {

    //Handle homepage request
    getHomepage: (req, res, next) => {
        res.render('main', {
            settings: {
                isLoggedIn: false,
                view: 'home',
            },
            user: req.user
        });
    }
}