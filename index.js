var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var user = require('./routes/user.route')
var cors = require('cors')
// set up morgan to use logs of http requests
var morganLogger = require('morgan')
var expressApp = express()


// set up mongoose connection
var dbUrl = require('./config/config').dbUrl
mongoose.connect(dbUrl, { useNewUrlParser: true })


// using bodyparser
expressApp.use(bodyParser.json())
expressApp.use(bodyParser.urlencoded({ extended: false }))
expressApp.use(cors())
// using morgan logger
expressApp.use(morganLogger('dev'))
expressApp.use('/', user)

expressApp.listen(3000, () => {
    console.log("server is running on 3000 port")

})



// let db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
