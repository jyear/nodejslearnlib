module.exports = zx_action.init();

zx_action.create('/app', function (req, res) {
    res.send(req.app.get('approot'));
});

zx_action.create('/redirect', function (req, res) {
    res.redirect(301, 'http://www.qq.com');
})

zx_action.create('/json', function (req, res) {
    res.json({
        value: {
            key1: 1,
            key2: 2
        }
    })
});

zx_action.create('/jsonp', function (req, res) {
    res.jsonp({
        value: {
            key1: 1,
            key2: 2
        }
    })
});

zx_action.create('/param/:name', function (req, res) {
    res.send(req.params.name);
});