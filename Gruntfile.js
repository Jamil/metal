module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        jshint: {
            files: ['Gruntfile.js',
                    'flightplan.js',
                    'app.js',
                    'models/*.js'],
            options: {
                globals: {
                    jQuery: false
                }
            }
        },
        shell: {
            options: {
                stderr: false
            },
            syncdb: {
                command: 'find ./models -name "*_defaults.js" | xargs mongo'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('default', ['jshint', 'shell']);
};
