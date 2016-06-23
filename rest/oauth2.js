var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.send('Oauth2.');
})

router.get('/code', function(req, res) {
    res.send('code');
})

module.exports = router;
