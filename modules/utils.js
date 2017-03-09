var util = {};
var __emptyString = '';
var __trimReg = /(^\s*)|(\s*$)/g;
util.trim = function (s) {
    return s.replace(__trimReg, __emptyString);
}

module.exports = util;