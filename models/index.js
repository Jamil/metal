var mongoose = require('mongoose');
var fs = require('fs');

mongoose.connect('mongodb://localhost/metal');

fs.readdirSync(__dirname).forEach(function (file) {
    require(__dirname+'/'+file)
})
