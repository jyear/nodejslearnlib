module.exports = zx_action.init();

zx_action.create('/config', function (req, res) {
    res.send(appsetting.getItem('ZJWebUrl'));
});
zx_action.create('/htmls/:file', function (req, res) {
    res.send(req.route);
});
