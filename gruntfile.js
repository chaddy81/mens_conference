// Gruntfile.js
module.exports = function (grunt) {
  grunt.initConfig({
    // Watch task config
    watch: {
      sass: {
        files: "scss/*.scss",
        tasks: ['sass', 'postcss']
      },
      jshint: {
        files: "js/*.js",
        tasks: ['jshint:all']
      },
      scsslint: {
        files: 'scss/*.scss',
        tasks: ['scsslint']
      }
    },
    // SASS task config
    sass: {
      dev: {
        options: {
          style: 'expanded'
        },
        files: {
          // destination         // source file
          "css/main.css" : "scss/main.scss"
        }
      }
    },

    jshint: {
      all: ['js/**/*.js']
    },

    // Using the BrowserSync Server for your static .html files.
    browserSync: {
      default_options: {
        bsFiles: {
          src: [
            "css/*.css",
            "*.html"
          ]
        },
        options: {
          watchTask: true,
          // server: {
          //   baseDir: './'
          // }
        }
      }
    },

    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer')({browsers: ['last 4 versions', '> 1%']})
        ]
      },
      dist: {
        src: 'css/*.css'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('default', ['browserSync', 'watch', 'postcss:dist']);
};
