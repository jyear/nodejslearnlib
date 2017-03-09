// var __utils = require('../modules/utils');
// var __emptyString = '';

// var requestPromise = function (options) {

//     return new Promise(function (resolve, reject) {

//         require('request')(options, function (error, response, body) {

//             if (error) {
//                 reject(error);
//             }
//             else if (response.statusCode != 200) {
//                 reject(new Error('HttpError Code:' + response.statusCode));
//             }
//             else {
//                 var re = {};
//                 if (body.length > 0) {
//                     var line, arr = body.split('\n');
//                     for (var i in arr) {
//                         line = arr[i];
//                         if (line != __emptyString && line != '\r' && line.substring(0, 1) != '#') {
//                             var index = line.indexOf(':');
//                             var k = line.substring(0, index);
//                             var v = line.substr(index + 1);
//                             re[__utils.trim(k)] = __utils.trim(v);
//                         }
//                     }
//                 }
//                 resolve(re);
//             }

//         })
//     })

// };

// var dosomthing = async function () {

//     var result = await requestPromise(
//         { url: 'http://api.handday.com/common/appsetting', method: 'POST', headers: { 'X-Request-With': 'AppSettingGeter' } });


//     console.log(result);

// }

// dosomthing();

// var request = require('urllib-sync').request;
// var res = request('http://api.handday.com/common/appsetting');
// console.log(res);

var request = require('sync-request');
var res = request('POST', 'http://api.handday.com/common/appsetting', {
  'headers': {
    'X-Request-With': 'AppSettingGeter'
  }
});

console.log(res.getBody('utf8'))
