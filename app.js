var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var log4js = require("log4js");
var express = require('express');
var app = express();

var init = function () {

    //全局变量
    app.set('approot', __dirname);
    app.set('controller', 'controllers');
    app.set('jsonp callback name', '_cb');


    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());

    // setRoutes
    require('./modules/rotues.js')(app);

    // setErrorHandler
    errorHandler(app);

    //log configure
    //logSetting(app);

    // setPort
    app.set('port', process.env.PORT || 3000);

    //boot server
    var server = app.listen(app.get('port'), function () {
        console.log('server listening on port ' + server.address().port);
    });

}

var errorHandler = function (app) {

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    app.use(function (err, req, res, next) {

        res.json({
            error: {
                type: 'httpError',
                code: err.status || 500,
                message: err.message
            }
        });

    });
}

var logSetting = function (app) {

    log4js.configure({
        appenders: [
            { type: 'console' },
            { type: 'file', filename: 'cheese.log', category: 'cheese' }
        ]
    });

    app.use(log4js.connectLogger(log4js.getLogger("cheese"), { level: log4js.levels.INFO }));

}

init();
