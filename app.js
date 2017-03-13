require('./global');

var path = require('path');
var log4js = require("log4js");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

//create app object
var express = require('express');
var app = express();

var init = function () {

    //env var
    var env = zx_conf.getItem('env');
    if (env) for (var k in env) process.env[k] = env[k];

    //global ver
    app.set('approot', __dirname);
    app.set('controller', 'controllers');
    app.set('jsonp callback name', '_cb');
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());

    // setRoutes
    require('./modules/rotues.js')(app).setRoutes();

    // setErrorHandler
    errorHandler(app);

    //log configure
    //logSetting(app);

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

var logSetting = function (app) {

    log4js.configure({
        appenders: [
            { type: 'console' },
            { type: 'file', filename: 'cheese.log', category: 'cheese' }
        ]
    });

    app.use(log4js.connectLogger(
        log4js.getLogger("cheese"),
        { level: log4js.levels.INFO }
    ));

}

init();