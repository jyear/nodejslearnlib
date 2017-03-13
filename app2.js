require('./global');

var path = require('path');

//create app object
var express = require('express');
var app = express();

var init = function () {

    app.use('/crm/customer', function (req, res, next) {
        res.send('/crm/customer')
        //next();
    })
    app.use(function (req, res, next) {
        console.log(2);
        next();
    })
    app.use(function (req, res, next) {
        console.log(3);
        next();
    })

    // setErrorHandler
    //errorHandler(app);

    app.set('port', process.env.PORT || 3000);

    //boot server
    var server = app.listen(app.get('port'), function () {
        console.log('server listening on port ' + server.address().port);
    });

}

var errorHandler = function (app) {

    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
    app.use(function (err, req, res, next) {
        zx_util.outErr(err, res);
    });
}

init();
