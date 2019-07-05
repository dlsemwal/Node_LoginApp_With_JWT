const User = require('../../models/user.model');
const bcrypt = require('bcrypt');
const saltRounds = require('../../config/config').saltRounds;
const jwt = require('jsonwebtoken')
const secret = require('../../config/config').secret
const userLib = {}

userLib.checkUniqueEmail = async function (email) {
    const userDetails = await User.findOne({ email: email });

    if (userDetails) {
        throw new Error('user already exist');
    }
}
userLib.encryptPassword = function (pswrd) {
    const encryptedPswrd = bcrypt.hashSync(pswrd, saltRounds)
    return encryptedPswrd
}
userLib.saveUser = async function (userRequest, pswrd) {
    const user = new User({
        name: userRequest.name,
        contact: userRequest.contact,
        designation: userRequest.designation,
        address: userRequest.address,
        email: userRequest.email,
        password: pswrd
    })
    return user.save();
}
userLib.checkPassword = async function (email, password) {
    const user = await User.findOne({ email: email })
    
    
    if (!bcrypt.compareSync(password, user.password)) {
        throw new Error('Invalid Password')
    }
    user.token = jwt.sign({ name: user.name, id: user._id }, secret)
    
    return user
}
userLib.generateToken = async function () {
    
}





module.exports = userLib