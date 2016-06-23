var express = require('express');
var User = require('../db/user.model');

var router = express.Router();

router.route('/')
    .get((req, res, next) => {
        User.find(function(err, users) {
            if (err) return console.error(err);
            res.send(users);
        })
    })
    .post((req, res, next) => {
        var user = new User(req.body);
        user.save((err, user) => {
            if (err) {
                res.status(400).send(err);
                return console.error(err);
            }
            res.send('Save ok.');
        })
    })
    .put((req, res, next) => {
        res.send(req.body);
    });

router.route('/user/:login')
    .get((req, res, next) => {
        User.findOne({
            login: req.params.login
        }, function(err, users) {
            if (err) return console.error(err);
            res.send(users);
        })
    })
    .delete((req, res, next) => {
        User.remove({
            login: req.params.login
        }, function(err) {
            if (err) {
                res.status(400).send(err);
                return console.error(err);
            }
            res.send('Delete ok.');
        });
    });
module.exports = router;
