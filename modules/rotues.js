var fs = require('fs');
var path = require('path');
var spr = path.sep,
    _app,
    _approot,
    _controller,
    _replacefolder,
    _exports = {};

_exports.setRoutes = function (curPath, curfolder) {

    curPath = curPath || _approot;
    curfolder = curfolder || _controller;

    if (!_app)
        return;
    if (!curPath || curPath.length == 0)
        return;
    if (!curfolder || curfolder.length == 0)
        return;

    var fullPath = path.join(curPath, curfolder);
    fs.readdirSync(fullPath).forEach((f) => {
        let states = fs.statSync(fullPath + spr + f);
        if (states.isDirectory()) {
            _exports.setRoutes(fullPath, f);
        } else {
            _exports.setControllers(fullPath, f);
        }
    })
}

_exports.setControllers = (function () {

    var reg = /\\/g;
    var dotjs = '.js';
    var emptystr = '';

    return function (fullPath, filename) {

        var jsfile = path.join(fullPath, filename);
        var handler = require(jsfile);
        if (handler.count > 0) {//action大于0才添加到路由

            var urlpath = jsfile
                .replace(_replacefolder, emptystr)
                .replace(dotjs, emptystr)
                .replace(reg, '/')
                .toLowerCase();
            var controllerName = filename
                .replace(dotjs, emptystr)
                .toLowerCase();

            var urlpatharr = [urlpath];
            if (controllerName == 'index') {
                urlpatharr.push(urlpath.substring(0, urlpath.lastIndexOf('/')));
            }

            urlpatharr.forEach((urlpath) => {

                //console.log(`jsfile:${jsfile} path:${urlpath},controllerName:${controllerName}`);

                for (var path in handler.actions) {

                    var act = handler.actions[path];
                    if (path.substring(0, 1) != '/') path = '/' + path;
                    _app.use(`${urlpath}${path}`, getHandler(act));

                }
            });

        }


    }

})()

var ArrayFind = function (methods, m) {


    if (typeof methods == 'undefined')
        return true;

    m = m && m.length > 0 ? m.toLowerCase() : 'get';

    for (var item of methods) {
        if (item == m)
            return true;
    }
    return false;

}
var getHandler = function (act) {

    return function (req, res, next) {
        if (ArrayFind(act.methods, req.method)) {
            act.cb(req, res, next);
        } else {
            next();
        }
    }

}

module.exports = function (app, controller, approot) {

    _app = app;
    if (_app) {
        _approot = app.get('approot');
        _controller = app.get('controller');
        _replacefolder = path.join(_approot, _controller);
    }
    return _exports;

};