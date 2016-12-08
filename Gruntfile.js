// This builds the library itself
module.exports = function (grunt) {
  // Configuration
  grunt.initConfig({
    uglify: {
      options: {
        banner: '/* superdom.js ' + grunt.file.readJSON('package.json').version + ' https://github.com/franciscop/superdom.js */\n'
      },
      my_target: {
        files: {
          'superdom.min.js': 'superdom.js'
        }
      }
    },

    // Super simple minifier that works with ES6
    copy: {
      main: {
        src: 'superdom.js',
        dest: 'superdom.min.js',
        options: {
          process: function (content, srcpath) {
            return content
              .replace(/\/\/[^\n]+/g, '')
              .replace(/\/\*[^*]+\*\/\s+/, '')
              .replace(/\n[^\S]*/g, ' ')
              .replace(/\s?\=\>\s?/g, '=>')
              .replace(/\s?\{\s?/g, '{')
              .replace(/\s?\}\s?/g, '}')
              .replace(/\s?\(\s?/g, '(')
              .replace(/\s?\)\s?/g, ')')
              .replace(/\s?\=\s?/g, '=')
              .replace(/\s?\:\s?/g, ':')
              .replace(/\s?\+\s?/g, '+')
              .replace(/\s?\,\s?/g, ',')
              .replace(/\s?\;\s?/g, ';')
              .replace(/;}/g, '}')
              ;
          }
        }
      }
    },

    semistandard: {
      app: {
        src: [
          'superdom.js'
        ]
      }
    },

    run: {
      test: {
        cmd: '/home/francisco/.nvm/versions/node/v7.2.1/bin/jest'
      }
    },

    watch: {
      scripts: {
        files: [
          'package.js', // To bump versions
          'Gruntfile.js',
          'superdom.js',
          '__tests__/**/*'
        ],
        tasks: ['default'],
        options: {
          spawn: false,
          livereload: true
        }
      }
    },

    bytesize: {
      all: {
        src: [
          'superdom.min.js'
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-semistandard');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-bytesize');
  grunt.loadNpmTasks('grunt-run');

  grunt.registerTask('build', ['copy', 'bytesize']);
  grunt.registerTask('test', ['semistandard']);
  grunt.registerTask('default', ['test', 'run:test', 'build']);
};
