var express = require('express');
var router = express.Router();
var exp = { router: router };
var maps = {};

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

exp.create = function (path, methods, cb) {

    //path
    if (typeof path != 'string' || path.length == 0)
        path = '/';

    //method
    var mtype = typeof methods;
    if (mtype == 'function') {
        cb = methods;
        methods = ['get'];
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

        methods.forEach((m) => {
            switch (m) {
                case 'get':
                    router.get(path, actionhandler(cb));
                    break;
                case 'post':
                    router.post(path, actionhandler(cb));
                    break;
                case 'delete':
                    router.delete(path, actionhandler(cb));
                    break;
                case 'put':
                    router.put(path, actionhandler(cb));
                    break;
                case 'head':
                    router.head(path, actionhandler(cb));
                    break;
            }
        })

    }

}

module.exports = exp;