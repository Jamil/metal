var plan = require('flightplan');

plan.target('production', [
    {
        host: 'crosswind.io',
        username: 'ubuntu',
        privateKey: '/Users/jamildhanani/.ssh/crosswind.pem'
    }
    ]
);

plan.local(function(local) {
    local.log('Checking to see if there are any uncommitted changes');
    local.exec('git diff --quiet');

    local.log('Checking to see if there are any unpushed changes');
    local.exec('git diff --quiet origin/master..HEAD');

    local.log('Install default data in Mongo');
    local.exec('find ./models -name "*_defaults.js" | xargs mongo');

    local.exec('grunt');
    local.exec('pm2 restart app.js');
});

plan.remote(function(remote) {
    remote.with('cd /metal/', function() {
        remote.log('Pull latest code from git');
        remote.git('pull');

        remote.log('Install dependencies');
        remote.exec('npm install');

        remote.with('cd data', function() {
            remote.log('Install default data in Mongo');
            remote.exec('node parser.js');
            remote.exec('node install.js');
        });

        remote.log('Set environment file');
        remote.exec('touch PRODUCTION');

        remote.log('Restart application');
        remote.exec('pm2 restart app.js');
    });
});
