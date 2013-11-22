module.exports = function (grunt) {

  grunt.initConfig({
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

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['sass']);

};