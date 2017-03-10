var express = require('express');
var router = express.Router()
module.exports = router;


var appsetting = require('../../modules/appsetting');

router.get('/', function (req, res) {    
    res.send(appsetting.getItem('ZJWebUrl'))
});