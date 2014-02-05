/*!
 * Grunt
 * $ npm install matchdep grunt-contrib-uglify grunt-autoprefixer grunt-contrib-cssmin grunt-contrib-imagemin grunt-contrib-sass grunt-contrib-watch grunt-contrib-concat grunt-contrib-clean grunt-contrib-jshint grunt-notify --save-dev
 */

module.exports = function(grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    // Autoprefix
    autoprefixer: {
      options: {
        browsers: [
          'last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'
        ]
      },
      dist: {
        src: 'dist/css/main.css'
      }
    },

    // CSS minify
    cssmin: {
      dist: {
        files: {
          'dist/css/main.min.css': 'dist/css/main.css'
        }
      }
    },

    // JShint
    jshint: {
      files: ['src/**/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Concat
    concat: {
      js: {
        src: ['src/**/*.js'],
        dest: 'dist/js/main.js'
      },
    },

    // Uglify
    uglify: {
      dist: {
        files: {
        	'dist/js/main.min.js': ['dist/js/main.js']
        }
      }
    },

    // Imagemin
    imagemin: {
      dist: {
        options: {
          optimizationLevel: 7,
          progressive: true,
          interlaced: true
        },
        files: [{
          expand: true,
          cwd: 'src/img',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'dist/img'
        }]
      }
    },

    // Clean
    clean: {
      build: ['dist/css', 'dist/js', 'dist/img']
    },

    // Notify
    notify: {
      styles: {
        options: {
          message: 'Styles task complete',
        }
      },
      scripts: {
        options: {
          message: 'Scripts task complete',
        }
      },
      images: {
        options: {
          message: 'Images task complete',
        }
      },
    },

    connect: {
      all: {
        options:{
          port: 9000,
          hostname: "0.0.0.0",
          // Prevents Grunt to close just after the task (starting the server) completes
          // This will be removed later as `watch` will take care of that
          keepalive: true
        }
      }
    },

    open: {
      all: {
        // Gets the port from the connect configuration
        path: 'http://localhost:<%= connect.all.options.port%>'
      }
    },

    // Watch
    watch: {
      styles: {
        files: 'src/css/*.css',
        tasks: ['autoprefixer', 'cssmin', 'notify:styles'],
      },
      scripts: {
        files: 'src/*.js',
        tasks: ['concat', 'uglify', 'notify:scripts'],
      },
      images: {
        files: 'src/img/*',
        tasks: ['imagemin', 'notify:images'],
      },
      livereload: {
        options: { livereload: true },
        files: [
          'dist/css/**/*.css',
          'dist/js/**/*.js',
          'dist/img/**/*'
        ]
      }
    }
  });

  // Default task
  grunt.registerTask('default', [
    'jshint',
    'clean',
    'concat',
    'uglify',
    'autoprefixer',
    'cssmin',
    'imagemin'
  ]);

   grunt.registerTask('server',[
   	'open',
    'connect'
  ]);
};