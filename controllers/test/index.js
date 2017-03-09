var express = require('express');
var router = express.Router();

var appsetting = require('../../modules/appsetting');

/* GET home page. */
router.get('/', function (req, res) {
    res.send(req.originalUrl);
});

router.get('/app', function (req, res) {
    res.send(req.app.get('approot'));
});
router.get('/redirect', function (req, res) {
    res.redirect(301, 'http://www.qq.com');
});

router.get('/json', function (req, res) {
    res.json({
        value: {
            key1: 1,
            key2: 2
        }
    })
});
router.get('/jsonp', function (req, res) {
    res.jsonp({
        value: {
            key1: 1,
            key2: 2
        }
    })
});
router.get('/param/:name', function (req, res) {
    res.send(req.params.name);
});

module.exports = router;