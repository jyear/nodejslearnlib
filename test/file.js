var fs = require('fs');
try{
    console.log(fs.readFileSync('../config2.json','utf-8'));
}
catch(e)
{
    console.log('error');
}
