module.exports = zx_action.init();

zx_action.create('/', function (req, res) {
    res.send(req.originalUrl);
});

zx_action.create('/getList', function (req, res) {
    res.send('1');
});