/**
 * Created by yagami on 5/24/17.
 */
"use strict";

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    mincss = require('gulp-clean-css'),
    maps = require('gulp-sourcemaps'),
    connect = require('gulp-connect'),
    reload = require('gulp-livereload'),
    //pipe = require('gulp-pipe'), NOT NECESSARY SINCE IT EXPLOITS JQUERY PIPE METHOD
    jade = require('gulp-jade');

gulp.task("concatApp", function() {
    return gulp.src([
        "src/js/services/*.js",
        "src/js/controllers/*.js",
        "src/js/directives/*.js",
        "src/js/app.js"
        ]
    )
        .pipe(maps.init())
        .pipe(concat("app.js"))
        .pipe(maps.write("./"))
        .pipe(gulp.dest("dist/js"))
        .pipe(reload());
});

gulp.task("concatLib", function() {
    return gulp.src([
        "bower_components/jquery/dist/jquery.min.js",
        "bower_components/jquery-ui/jquery-ui.min.js",
        "bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js",
        "bower_components/angular/angular.min.js"]
    )
        .pipe(concat("lib.min.js"))
        .pipe(gulp.dest("assets/js"))
        .pipe(reload());
});

gulp.task("minify", ["concatApp"],function() {
    return gulp.src("dist/js/app.js")//WE MINIFY ALREADY CONCATENATED SCRIPTS. NOT SRC
        .pipe(uglify())
        .pipe(rename("app.min.js"))
        .pipe(gulp.dest("dist/js"))
        .pipe(reload());
});

gulp.task('sass', function() {
    return gulp.src("src/css/application.scss")
        .pipe(maps.init())
        .pipe(sass())
        .pipe(maps.write('./'))
        .pipe(mincss())
        .pipe(rename("application.min.css"))
        .pipe(gulp.dest('dist/css'))
        .pipe(reload());
});

gulp.task('jade', function() {
    return gulp.src('src/index.jade')
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest('dist'))
        .pipe(reload());
});

gulp.task('watch', function(){
    reload.listen();
    gulp.watch(['src/css/*.scss', 'bower_components/bootstrap-sass/assets/stylesheets/**/*.scss'], ['sass']);
    gulp.watch(['src/js/**/*.js', 'gulpfile.js'], ['minify']);
    gulp.watch('src/*.jade', ['jade']);
});

gulp.task('default', ['watch'], function() {
    connect.server({port: 3000});
});























