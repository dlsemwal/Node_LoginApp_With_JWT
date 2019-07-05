const User = require('../models/user.model');
const express = require('express');
const validators = require('../validators/validators')

// set up express-validator


const router = express.Router();

const userController = require('../controllers/user.controller');

// router.get('/', userController.test)

router.post('/', validators.signupValidator, userController.newUser)

router.post('/login', validators.loginValidator, userController.login)

router.get('/', validators.tokenValidator, userController.getUsers)

router.get('/:id', validators.tokenValidator, userController.getUser)

router.delete('/:id', validators.tokenValidator, userController.dltUser)

router.put('/:id', validators.tokenValidator, userController.updateUser)

module.exports = router