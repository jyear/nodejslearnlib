var express = require('express');
var router = express.Router()
module.exports = router;

var mongo = require('../../modules/mongoutil');

router.get("/getList", function (req, res) {

    //分页
    //处理查询条件
    //实体映射
    res.send('very good');

})


router.get('/getDetails', function (req, res, next) {

    mongo.act('crm.customer', 'server1', function (err, db, col) {

        if (err) {
            next(err);
            mongo.close(db);
        }
        else {

            var filter = {
                _id: mongo.objid.fromString(req.query.id)
            };

            col.findOne(filter, function (err, item) {
                if (err) {
                    next(err);
                } else {
                    res.json(item);
                }
                mongo.close(db);
            });

        }

    });

});