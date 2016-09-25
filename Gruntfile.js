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

    copy: {
      main: {
        src: 'superdom.js',
        dest: 'superdom.min.js',
        options: {
          process: function (content, srcpath) {
            return content
              .replace(/\/\/[^\n]+/g, '')
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
              // .replace(/(\(\w*(:?\,\w+)*\)|\w*(:?\,\w+)*)=>/g, function (matched) {
              //   matched = matched.replace(/\)?\=\>$/, '').replace(/^\(/, '').split(',');
              //   console.log(matched);
              // })
              .replace(/;}/g, '}')
              ;
          }
        }
      }
    },

    semistandard: {
      app: {
        src: [
          '!./test'
        ]
      }
    },

    watch: {
      scripts: {
        files: [
          'package.js', // To bump versions
          'Gruntfile.js',
          'superdom.js',
          'test/test.js'
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

  grunt.registerTask('build', ['copy', 'bytesize']);
  grunt.registerTask('test', ['semistandard']);
  grunt.registerTask('default', ['build', 'test', 'bytesize']);
};
