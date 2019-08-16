const fs = require('fs')
fs.readdir('data', function(err, fileList){
    console.log(fileList);
});