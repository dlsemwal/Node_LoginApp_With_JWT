const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const secret = require('../config/config')
const User = require('../models/user.model')

function validationRes (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next()
}

exports.signupValidator = [
    check('name').not().isEmpty().isString(),
    check('contact').exists().isNumeric(),
    check('designation').exists().isString(),
    check('address').exists().isString(),
    check('email').exists().isEmail(),
    check('password').exists().isLength({ min: 8 }),
    check('passwordConfirmation').exists().custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password')
        }
        return true
    }),
    validationRes
]

exports.loginValidator = [
    check('email').exists().isEmail(),
    check('password').exists(),
    function (req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        next()

    }
    
]


exports.updateValidator = check('email').exists()
// .custom((value) => {
//     return User.findOne({ email: value }, (err, person) => {
//         if (err) throw err
//         if (!person) {
//             return Promise.reject('Invalid User ID')
//         }
//         return true
//     })


// })

exports.tokenValidator = async function (req, res, next) {
    try {
        const token = req.headers.authorization
        const decodedData = await jwt.verify(token, secret.secret);
        req.body.loginUserDetails = decodedData;
        next();
    }
    catch (err) {
        res.send(new Res(false, { error: err.message }, 'Invalid token'))

    }
}