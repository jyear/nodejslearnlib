var express = require('express');
var router = express.Router();

var appsetting = require('../../modules/appsetting');

/* GET home page. */
router.get('/', function (req, res) {
    //res.send(req.originalUrl);
    //res.send('very good!');
    
    res.send(appsetting.getItem('ZJWebUrl'))

});

module.exports = router;