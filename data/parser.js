var fs = require('fs');
var lazy = require('lazy');

function getDataFiles() {
    var files = fs.readdirSync(process.cwd());
    files = files.filter(function(n) {
        return (n.match('.*\.dat') != null);
    });
    return files;
}

function toJSON(filename) {
    var output = [];

    var array = fs.readFileSync(filename).toString().split('\n').filter(function(line) {
        return line.length > 0;
    });

    var headers = array[0].split('\t');
    headers = headers.map(function(str) { return str.trim(); });

    for (var i = 1; i < array.length; i++) {
        var row = array[i];
        var cols = row.split('\t');
        cols = cols.map(function(str) { return str.trim(); });

        var obj = {};
        for (var j = 0; j < headers.length; j++) {
            if (cols[j]) {
                obj[headers[j]] = cols[j];
            }
            else {
                obj[headers[j]] = null;
            }
        }
        output.push(obj);
    }

    var json = JSON.stringify(output, null, 2);
    var pathComponents = filename.split('.');
    var outFile = pathComponents[0] + '.json';

    fs.writeFile(outFile, json, function(err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(filename + ' > ' + outFile);
        }
    });
}

getDataFiles().map(toJSON);
