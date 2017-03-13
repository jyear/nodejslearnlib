module.exports = zx_action.init();

zx_action.create("/getList", function (req, res) {

    //分页
    //处理查询条件
    //实体映射
    res.send('2');

})


zx_action.create('/getDetails', function (req, res, next) {

    zx_mongo.act('crm.customer', 'server1', function (err, db, col) {

        if (err) {
            next(err);
            zx_mongo.close(db);
        }
        else {

            var filter = {
                _id: zx_mongo.objid.fromString(req.query.id)
            };

            col.findOne(filter, function (err, item) {
                if (err) {
                    next(err);
                } else {
                    res.json(item);
                }
                zx_mongo.close(db);
            });

        }

    });

});