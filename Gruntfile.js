module.exports = function (grunt) {

  grunt.initConfig({
    requirejs: {
      compile: {
        options: {
          almond: true,
          baseUrl: 'static/js',
          mainConfigFile: 'static/js/node-map.js',
          name: 'node-map.js',
          out: 'static/js/built.js'
        }
      }
    },
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          './static/css/screen.css': './static/scss/screen.scss'
        }
      }
    },
    concat: {
      css: {
        src: [
          './static/vendor/bootstrap/dist/css/bootstrap.css',
          './static/css/screen.css'
        ],
        dest: './static/css/all.css'
      }
    },
    watch: {
      css: {
        files: ['**/*.scss'],
        tasks: [
          'sass',
          'concat'
        ],
        options: {
          livereload: true,
        },
      },
    }
  });

  grunt.loadNpmTasks('grunt-requirejs');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['requirejs']);

};