var exp = { count: 0, actions: {} };

var actionhandler = function (cb) {

    return function (req, res, next) {

        //执行其它中间组件

        //调用户回调
        try {
            cb(req, res, next);
        } catch (error) {
            next(error);
        }

    }

}

exp.init = function () {
    exp = { count: 0, actions: {} }
    return exp;
}

exp.create = function (path, methods, cb) {

    //path
    if (typeof path != 'string' || path.length == 0)
        path = '/';

    //method
    var mtype = typeof methods;
    if (mtype == 'function') {
        cb = methods;
        methods = ['get', 'post'];
    }
    else if (mtype == 'string') {
        methods = [methods.toLowerCase()];
    }
    else {
        var ms = methods;
        methods = [];
        for (var m of ms) methods.push(m.toLowerCase());
    }

    //cb
    if (typeof cb == 'function') {
        exp.count += 1;
        exp.actions[path] = { methods: methods, cb: actionhandler(cb) }
    }

}

module.exports = exp;