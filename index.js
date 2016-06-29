/*******  import module  **********/
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var mongoose = require('mongoose');

/*******  env config  **********/
// forbit the server info leak
app.disable('x-powered-by');

// db
mongoose.connect('mongodb://120.25.234.188:27017/timebottles_test');
var db = mongoose.connection;
var app = express();
var port = 8081;

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded

/*******  router  **********/
app.get('/', function(req, res) {
    res.send('Welcome to time bottles.');
})

// app.use(multer()); // for parsing multipart/form-data
app.use('/oauth2', require('./rest/oauth2'));
app.use('/users', require('./rest/user.resource'));

/*******  start server & fault-tolerance  **********/
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', (cb) => {
    console.log('mongo connected.');
    var server = app.listen(port, function() {
        var host = server.address().address;
        console.log("Server listening at http://%s : %s", host, port);
    });
});
