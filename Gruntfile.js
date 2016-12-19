module.exports = function(grunt) {
    grunt.initConfig({
        copy: {
            public: {
                expand: true,
                cwd: 'public',
                src: '**',
                dest: 'dist'
            }
        },
        clean: {
            dist: {
                src: 'dist'
            },
            nonDist: ['dist/**/*.js', 'dist/**/*.css', '!dist/**/*.min.js', '!dist/**/*.min.css']
        },
        useminPrepare: {
            html: 'dist/**/*.html'
        },
        usemin: {
            html: 'dist/**/*.html'
        },
        imagemin: {
            public: {
                expand: true,
                cwd: 'dist/img',
                src: '**/*.{png, jpg, gif}',
                dest: 'dist/img'
            }
        },
        rev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 8
            },
            images: {
                src: ['dist/img/**/*.{png, jpg, gif}']
            },
            minifiedFiles: {
                src: ['dist/js/**/*.min.js', 'dist/css/**/*.min.css']
            }
        }
    });

    grunt.registerTask('dist', ['clean', 'copy']);
    grunt.registerTask('min', ['useminPrepare', 'concat:generated', 'uglify:generated', 'cssmin:generated', 
        'rev:images', 'rev:minifiedFiles', 'usemin', 'imagemin']);
    grunt.registerTask('default', ['dist', 'min', 'clean:nonDist']);

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-rev');
    grunt.loadNpmTasks('grunt-usemin');
}
