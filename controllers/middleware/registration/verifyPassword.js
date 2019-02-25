const verifyPassword = function (password, password2) {
    const errors = [];
    if (password !== password2) {
        errors.push({
            msg: 'Passwords do not match'
        });
    }

    //Check password length
    if (password.length < 6) {
        errors.push({
            msg: "Password is too short. It should be at least 6 characters"
        });
    }

    return errors;
}


module.exports = verifyPassword;