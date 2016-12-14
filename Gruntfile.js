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


    concat: {
      main: {
        options: {
          process: function (src, file) {
            return /test\.js/.test(file) ? '' : src;
          }
        },
        files: {
          'superdom.js': ['src/superdom.js', 'src/plugins/*.js'],
          // 'documentation.md': ['src/readme.md', 'src/plugins/**/readme.md']
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
          'src/**.js', '!src/**.test.js'
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
          'src/**/*.js',
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
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-bytesize');
  grunt.loadNpmTasks('grunt-run');

  grunt.registerTask('build', ['concat', 'copy', 'bytesize']);
  grunt.registerTask('test', ['semistandard', 'run:test']);
  grunt.registerTask('default', ['build', 'test']);
};
