var mongo = require('../modules/mongoutil.js');
mongo.act('platform.appconfig', 'server1', function (error, db, col) {

    col.find({ CorpId: 74010 }, function (err, cur) {
        cur.toArray(function (err, result) {
            console.log(result);
            db.close();
        })
    });

})