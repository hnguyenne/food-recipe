const express = require('express');
const accountController = require('../controllers/account.controller');

const router = express.Router();

module.exports.setup = (app) => {
    app.use('/account', router);
    
    router.post('/register', accountController.register);
    router.post('/login', accountController.login);
    router.get('/profile', accountController.getProfile);
    router.put('/profile', accountController.updateProfile);
    router.delete('/logout', accountController.logout);
};