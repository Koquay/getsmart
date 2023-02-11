const router = require('express').Router();
const userController = require('./user.controller');
const { authenticateUser } = require('./user.service');

router.put('/', userController.signIn);
router.post('/', userController.signUp);
router.put('/:resetPassword', userController.resetPassword);
router.put('/update/user/record', authenticateUser, userController.updateUserTestRecord);
router.put('/logout/1', userController.logout);
router.get('/:email', userController.verifyEmailForPasswordReset);
router.get('/', authenticateUser, userController.getUserTestRecords);

module.exports = router;
