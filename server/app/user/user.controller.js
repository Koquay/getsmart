const userService = require('./user.service');

exports.signIn = (req, res) => {
    userService.signIn(req, res);
}

exports.signUp = (req, res) => {
    userService.signUp(req, res);
}

exports.verifyEmailForPasswordReset = (req, res) => {
    userService.verifyEmailForPasswordReset(req, res);
}

exports.resetPassword = (req, res) => {
    userService.resetPassword(req, res);
}

exports.logout = (req, res) => {
    userService.logout(req, res);
}

exports.updateUserTestRecord = (req, res) => {
    userService.updateUserTestRecord(req, res);
}

exports.getUserTestRecords = (req, res) => {
    userService.getUserTestRecords(req, res);
}

