module.exports = zx_action.init();

zx_action.create('/app', function (req, res) {
    res.send(req.app.get('approot'));
});
zx_action.create('/htmls/:html', function (req, res) {
    res.send(req.params.html);
});
