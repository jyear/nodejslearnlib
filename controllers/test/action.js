var action = require('../../modules/action');
module.exports = action.router;

action.create('/app', ['POST', 'GET'], function (req, res) {
    res.send(req.app.get('approot'));
});
action.create('/htmls/:html', function (req, res) {
    res.send(req.params.html);
});
