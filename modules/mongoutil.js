var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var ObjectID = mongodb.ObjectID;

var __appsetting = require('./appsetting.js');
var __defaultdb = 'defaultdb';
var __mongoutil = {};

var __serverConfig = ['poolSize', 'auto_reconnect'];

var __cb = function (err, db, col, cb) {
    if (cb && typeof cb == 'function')
        cb(err, db, col);
}

__mongoutil.act = function () {

    //args validate
    var entstr, configKey, callback;
    if (arguments.length == 0) {
        __cb(new Error('callback and entstr is required'), undefined, undefined, callback);
        return;
    }

    if (arguments.length == 1) {
        entstr = arguments[0];
        configKey == __defaultdb;
        callback == null;
    }
    else if (arguments.length == 2) {
        entstr = arguments[0];
        if (typeof arguments[1] == 'string') {
            configKey = arguments[1];
            callback = null;
        }
        else if (typeof arguments[1] == 'function') {
            configKey = __defaultdb;
            callback = arguments[1];
        }
    }
    else if (arguments.length == 3) {
        entstr = arguments[0];
        configKey = arguments[1];
        callback = arguments[2];
    }

    if (typeof entstr != 'string' || entstr.length == 0) {
        __cb(new Error('entString is empty'), undefined, undefined, callback);
        return;
    }
    if (typeof configKey != 'string' || configKey.length == 0) {
        configKey = __defaultdb;
    }

    //entSplit
    var _curDbName, _curColName
    var arr = entstr.split('.');
    if (arr.length == 0) {
        __cb(new Error('entString format error'), undefined, undefined, callback);
        return;
    }
    else if (arr.length == 1) {
        _curDbName = arr[0];
    }
    else {
        _curDbName = arr[0];
        _curColName = entstr.substr(entstr.indexOf('.') + 1);
    }

    //dbconfig validate
    var dbconfig = __appsetting.getItem(configKey);
    if (!dbconfig) {
        __cb(new Error('dbconfig not exist'), undefined, undefined, callback);
    }
    else if (!dbconfig.host) {
        __cb(new Error('dbconfig host error'), undefined, undefined, callback);
    }
    else {
        var conn_str = 'mongodb://' + dbconfig.host + ':' + (dbconfig.port || 27017) + '/' + _curDbName;
        MongoClient.connect(conn_str, {}, function (connerr, db) {
            if (connerr) {
                __cb(connerr, undefined, undefined, callback);
            }
            else if (!db) {
                __cb(new Error('db ' + _curDbName + ' error'), undefined, undefined, callback);
            }
            else if (!_curColName || _curColName.length == 0) {
                __cb(err, db, undefined, callback);
            }
            else {
                db.collection(_curColName, function (err, col) {
                    __cb(err, db, col, callback);
                })
            }

        })
    }

}
__mongoutil.close = function (db) {
    if (db) {
        if (typeof db['close'] == 'function')
            db.close();
    }
}


//ObjectID function
var __objid = __mongoutil.objid = {};

__objid.fromString = function (str) {
    if (typeof str == 'string' && str.length > 0)
        return ObjectID.createFromHexString(str);
    else
        return undefined;
}
__objid.getTime = function (objid) {
    if (ObjectID.isValid(objid))
        return objid.getTimestamp();
    return undefined;
}
__objid.toString = function (objid) {
    if (ObjectID.isValid(objid))
        return objid.toHexString();
    return '';
}
__objid.ObjectID = ObjectID;

module.exports = __mongoutil;