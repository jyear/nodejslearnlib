var sleep = function (time) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve('timer');
        }, time);
    })
};
var start = async function () {

    var result = await sleep(3000);
    console.log(result);

};

start();