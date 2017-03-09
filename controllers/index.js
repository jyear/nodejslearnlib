var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.send(req.originalUrl);
});
router.get('/test1', function (req, res) {
    res.send(req.originalUrl);
});
router.get('/test2', function (req, res) {
    res.send(req.originalUrl);
});
router.get('/test3', function (req, res) {
    res.send(req.originalUrl);
});

module.exports = router;