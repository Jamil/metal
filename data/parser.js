var fs = require('fs');
var lazy = require('lazy');

String.prototype.toCamel = function(){
    var str = this.replace(/([-_][a-z])/g, function($1){return $1.toUpperCase().replace(/[-_]/,'');});
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function getDataFiles() {
    var files = fs.readdirSync(process.cwd() + '/dat/');
    files = files.filter(function(n) {
        return (n.match('.*\.dat') != null);
    });
    return files;
}

function makeSchema(filename, headers, sampleLine) {
    var pathComponents = filename.split('.');
    var name = pathComponents[0];
    var outFile1 = 'schema/' + name + '.js';
    var outFile2 = '../models/' + name + '.js';

    schemaDict = {};
    for (var i = 0; i < headers.length; i++) {
        var type = typeof(sampleLine[i]);
        schemaDict[headers[i]] = type.toCamel();
    }

    // Plus, everything should have an ID
    schemaDict['_id'] = 'String';

    var templateContents = fs.readFileSync('schema/template', 'utf8');
    var result = templateContents.replace(/MODEL_NAME/g, name.toCamel());

    var schemaContent = JSON.stringify(schemaDict, null, 2);
    schemaContent = schemaContent.replace(/"/g, '');

    result = result.replace('SCHEMA', schemaContent);

    fs.writeFile(outFile1, result, function(err) {
        if (err) console.log(err);
        else {
            console.log(('dat/' + filename) + ' > ' + outFile1);
        }
    });

    fs.writeFile(outFile2, result, function(err) {
        if (err) console.log(err);
        else {
            console.log(('dat/' + filename) + ' > ' + outFile2);
        }
    });
}

function makeRoute(filename) {
    var pathComponents = filename.split('.');
    var name = pathComponents[0];
    var outFile = '../routes/' + name + '.js';

    var templateContents = fs.readFileSync('routes/template', 'utf8');
    var result = templateContents.replace('MODEL_LOW', name);
    result = result.replace(/MODEL/g, name.toCamel());

    fs.writeFile(outFile, result, function(err) {
        if (err) console.log(err);
        else {
            console.log(('dat/' + filename) + ' > ' + outFile);
        }
    });
}

function toJSON(filename) {
    var output = [];

    var array = fs.readFileSync('dat/' + filename).toString().split('\n').filter(function(line) {
        return line.length > 0;
    });

    var headers = array[0].split('\t');
    headers = headers.map(function(str) { return str.trim(); });

    var noID = true;
    for (var i = 0; i < headers.length; i++) {
        if (headers[i] == "_id")
            noID = false;
    }

    for (var i = 1; i < array.length; i++) {
        var row = array[i];
        var cols = row.split('\t');
        cols = cols.map(function(str) { return str.trim(); });

        var summary = '';

        var obj = {};
        for (var j = 0; j < headers.length; j++) {
            if (cols[j]) {
                if (j < 3) {
                    summary += cols[j];
                }

                var writeValue = cols[j];
                if (writeValue == '*') writeValue = true;
                obj[headers[j]] = writeValue;
            }
            else {
                obj[headers[j]] = null;
            }
        }

        if (noID) {
            obj['_id'] = summary;
        }

        output.push(obj);
    }

    var json = JSON.stringify(output, null, 2);
    var pathComponents = filename.split('.');
    var outFile = 'json/' + pathComponents[0] + '.json';

    fs.writeFile(outFile, json, function(err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(('dat/' + filename) + ' > ' + outFile);
        }
    });

    var sampleLine = array[1];
    makeSchema(filename, headers, sampleLine);
    makeRoute(filename);
}

getDataFiles().map(toJSON);
