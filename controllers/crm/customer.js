var express = require('express');
var router = express.Router();

var mongo = require('../../modules/mongoutil.js');

/* GET home page. */
router.get('/getDetails', function (req, res) {

    mongo.act('crm.customer', 'server1', function (err, db, col) {

        if (err) {
            console.log(err);
            mongo.close(db);
        }
        else {
            col.findOne({ _id: mongo.objid.fromString(req.query.id) }, function (err, item) {
                if (err) {
                    console.log(err);
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