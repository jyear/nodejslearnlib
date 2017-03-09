var fs = require('fs');
var path = require('path');

var setRoutes = function (app, curPath, curfolder) {

    if (!app)
        return;

    curPath = curPath || app.get('approot');
    curfolder = curfolder || app.get('controller');

    if (!curPath || curPath.length == 0)
        return;
    if (!curfolder || curfolder.length == 0)
        return;

    var fullPath = path.join(curPath, curfolder);
    var results = fs.readdirSync(fullPath);
    var f, states;

    for (var i in results) {

        f = results[i];
        states = fs.statSync(fullPath + '\\' + f);

        if (states.isDirectory()) {
            setRoutes(app, fullPath, f);
        } else {
            setControllers(app, fullPath, f);
        }

    }

}

var setControllers = (function () {

    var reg = /\/index$/gi;
    var dotjs = '.js';
    var emptystr = '';

    return function (app, fullPath, f) {

        var controller = app.get('controller');
        var tmp_arr = fullPath.split('\\' + controller);

        var path;
        if (tmp_arr.length == 1)
            path = '/';
        else
            path = tmp_arr[1].replace("\\", '/') + '/';

        path = (path + f.replace(dotjs, emptystr)).toLowerCase();

        var h = require(fullPath + "\\" + f);
        app.use(path, h);
        //console.log(path);

        if (path == '/index') {

            app.use('/', h);
            //console.log('/');

        } else if (reg.test(path)) {

            path = path.replace(reg, '');
            app.use(path, h);
            //console.log(path);

        }

    }

})()

module.exports = setRoutes;