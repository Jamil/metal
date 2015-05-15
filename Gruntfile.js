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
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('default', ['jshint', 'shell']);
};
