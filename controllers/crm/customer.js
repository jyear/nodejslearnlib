var express = require('express');
var router = express.Router();

var mongo = require('../../modules/mongoutil');
var httputil = require('../../modules/httputil');

/* GET home page. */
router.get('/getDetails', function (req, res) {

    mongo.act('crm.customer', 'server1', function (err, db, col) {

        if (err) {
            httputil.err(err, res);
            mongo.close(db);
        }
        else {

            var filter = {
                _id: mongo.objid.fromString(req.query.id)
            };

            col.findOne(filter, function (err, item) {
                if (err) {
                    httputil.err(err, res);
                } else {
                    res.json(item);
                }
                mongo.close(db);
            });
            
        }

    });

});

router.get('/getList', function (req, res) {

    //分页
    //处理查询条件
    //实体映射

});

router.post('/saveCustomer', function (req, res) {

});

module.exports = router;