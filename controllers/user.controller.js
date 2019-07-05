const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const saltRounds = require('../config/config').saltRounds;
const userLib = require('./user/user.lib')
class Res {
    constructor(success, data, message) {
        this.success = success;
        this.data = data;
        this.message = message
    }
}

exports.test = function (req, res) {
    res.send('greetings from the test controller!')
}

exports.newUser = async function (req, res) {
    try {
        await userLib.checkUniqueEmail(req.body.email)
        const encryptedPassword = await userLib.encryptPassword(req.body.password)
        const saveDetail = await userLib.saveUser(req.body, encryptedPassword)
        res.send({ success: true, data: saveDetail });
    }
    catch (err) {
        res.send({ success: false, error: err.message });
    }
}
exports.login = async function (req, res) {
    try {
        console.log(req.body);
        
        const user = await userLib.checkPassword(req.body.email, req.body.password)
        
        res.send({
            success: true,
            data: { user: user, token: user.token },
            message: 'Successful Login'

        })
    }
    catch (err) {
        res.send({ success: false, error: err.message })

    }

}
exports.getUsers = async function (req, res) {
    const resPerPage = 5;
    const page = req.params.page;
    try {
        const foundUsers = await User.find({})
            .skip((resPerPage * page) - resPerPage)
            .limit(resPerPage)
        res.send(new Res(true, foundUsers, 'Users sent successfully'))
    }
    catch (err) {
        res.send(new Res(false, err.message, 'Unsuccessful Request'))
    }


}

exports.getUser = async function (req, res) {
    try {
        const user = await User.findOne({ _id: req.params.id })


        res.send(new Res(true, user, 'Successful request'))
    }
    catch (err) {
        res.send(new Res(false, { Error: err.message }, 'Invalid token request'))
    }
}

exports.dltUser = async function (req, res) {
    try {
        await User.findByIdAndRemove(req.params.id, (err, user) => {
            if (err) throw err
            res.send(new Res(true, user, 'Successfully deleted'))
        })
    }
    catch (err) {
        res.send(new Res(false, { Error: err.message }, 'Request failed'))
    }

}

exports.updateUser = async function (req, res) {
    try {
        if (await User.findOne({ email: req.body.email })) {
            throw new Error('This email belongs to existing user')
        }
        await User.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, user) => {
            if (err) throw err
            res.send(new Res(true, user, 'Successfully Updated'))
        })
    }
    catch (err) {
        res.send(new Res(false, { Error: err.message }, 'Request failed'))
    }


}
