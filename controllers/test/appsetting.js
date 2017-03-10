var express = require('express');
var router = express.Router()
module.exports = router;

var appsetting = require('../../modules/appsetting');

router.get('/config', function (req, res) {
    res.send(appsetting.getItem('ZJWebUrl'));
});
router.use('/htmls/:file', function (req, res) {
    res.send(req.route);
});
