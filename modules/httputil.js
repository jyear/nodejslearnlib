var exp = {};
exp.err = function (err, res) {

    if (!err)
        return;
    if (!res)
        return;

    res.status(200).json({
        error: {
            type: 'httpError',
            code: err.status || 500,
            message: err.message
        }
    });

    if (process.env.dev || process.env.development)
        console.log(err);

}

module.exports = exp;