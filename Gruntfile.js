// This builds the library itself
module.exports = function (grunt) {
  // Configuration
  grunt.initConfig({
    uglify: {
      options: {
        banner: '/* dom.js ' + grunt.file.readJSON('package.json').version + ' https://github.com/franciscop/dom.js */\n'
      },
      my_target: {
        files: {
          'dom.min.js': 'dom.js'
        }
      }
    },

    copy: {
      main: {
        src: 'dom.js',
        dest: 'dom.min.js',
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
          },
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
          'dom.js',
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
          'dom.min.js'
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
