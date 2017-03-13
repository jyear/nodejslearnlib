var util = {};
var __emptyString = '';
var __trimReg = /(^\s*)|(\s*$)/g;

util.trim = function (s) {
    return s.replace(__trimReg, __emptyString);
}
util.outErr = function (err, res) {

    if (!err)
        return;
    if (!res)
        return;

    var out = { message: err.message };
    if (typeof err.status != 'undefined') {
        out.code = err.status;
        out.type = 'httpError';
    }
    if (typeof err.code != 'undefined')
        out.code = err.code;
    if (typeof err.type == 'undefined')
        out.type = err.type;

    res.status(200).json({ error: out });

    if (Boolean(process.env.dev)) {
        console.log(err);
    }

}
util.outJson = function (obj, res) {

    if (!obj)
        return;
    if (!res)
        return;

    res.status(200).json({
        error: null,
        value: obj
    });

}

module.exports = util;