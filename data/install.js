var fs = require('fs');
var mongoose = require('mongoose');
var models = require('../models');

String.prototype.toCamel = function(){
    var str = this.replace(/([-_][a-z])/g,
                        function($1) {
                            return $1.toUpperCase().replace(/[-_]/,'');
                        });
    return str.charAt(0).toUpperCase() + str.slice(1);
};

var files = fs.readdirSync(process.cwd() + '/json/');
files = files.filter(function(n) {
    // Ignore routes right now until we upgrade to a more memory-heavy machine
    return (n.match('.*\.json') != null) && n != 'route.json';
});

var objs = {};
for (var i = 0; i < files.length; i++) {
    var fileBase = files[i].split('.')[0].toCamel();
    objs[fileBase] = require('./json/' + files[i]);
}

var totals = {};
var successes = {};
var duplicates = {};
for (model in objs) {
    successes[model] = 0;
    duplicates[model] = 0;
    totals[model] = 0;
}

function registerSave(err, model) {
    if (err && err.code == 11000) {
        duplicates[model]++;
    }
    else if (err) {
        console.log('Exiting: error');
        console.log(err);
        process.exit(code=1);
    }
    else {
        successes[model]++;
    }

    totals[model]++;

    if (duplicates[model] + successes[model] == objs[model].length) {
        console.log(model);
        console.log(successes[model] + ' insertions');
        console.log(duplicates[model] + ' duplicates');
        console.log(objs[model].length + ' total');
        console.log('');
    }

    var allDone = true;
    for (model in objs) {
        if (totals[model] < objs[model].length) {
            allDone = false;
        }
    }
    if (allDone) {
        process.exit(code=0);
    }
}

for (model in objs) {
    var ModelClass = mongoose.model(model);
    for (var j = 0; j < objs[model].length; j++) {
        var obj = new ModelClass(objs[model][j]);
        obj.save(function (err, obj) {
            this.registerSave(err, this.model);
        }.bind(
            {
                'obj': obj,
                'model': model,
                'registerSave': registerSave
            }
        ));
    }
}

