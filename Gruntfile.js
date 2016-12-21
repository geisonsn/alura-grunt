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
            nonDistFiles: ['dist/**/*.js', 'dist/**/*.css', '!dist/**/*.min.js', '!dist/**/*.min.css']
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
        },
        coffee: {
            compile: {
                expand: true,
                cwd: 'public/coffee',
                src: ['**/*.coffee'],
                dest: 'public/js',
                ext: '.js'
            }
        },
        less: {
            compile: {
                expand: true,
                cwd: 'public/less',
                src: ['**/*.less'],
                dest: 'public/css',
                ext: '.css'
            }
        },
        watch: {
            coffee: {
                options: {
                    event: ['added', 'changed']
                },
                files: 'public/coffee/**/*.coffee',
                tasks: 'coffee:compile'
            },
            less: {
                options: {
                    event: ['added', 'changed']
                },
                files: 'public/less/**/*.less',
                tasks: 'less:compile'
            },
            js: {
                options: {
                    event: ['changed']
                },
                files: 'public/js/**/*.js',
                tasks: 'jshint:js'
            }
        },
        jshint: {
            js: {
                src: ['public/js/**/*.js']
            }
        },
        browserSync: {
            public: {
                bsFiles: {
                    src: ['public/**/*']
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: 'public'
                    }
                }
            }
        }
    });

    grunt.registerTask('dist', ['clean:dist', 'copy']);
    grunt.registerTask('min', ['useminPrepare', 'concat:generated', 'uglify:generated', 'cssmin:generated', 
        'rev:images', 'rev:minifiedFiles', 'usemin', 'imagemin']);
    grunt.registerTask('server', ['browserSync', 'watch']);
    grunt.registerTask('default', ['dist', 'min', 'clean:nonDistFiles']);

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-rev');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-browser-sync');
}
