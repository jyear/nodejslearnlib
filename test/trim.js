var __trimReg = /(^\s*)|(\s*$)/g;

var trim = function (s) {
    return s.replace(__trimReg, '');
}

console.log(trim('   Adsfsdg    fff   '));