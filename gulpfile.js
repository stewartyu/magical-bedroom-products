var gulp = require('gulp');
var jsonServer = require('gulp-json-srv');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var jade = require('gulp-jade');
var html = require('html-browserify');

var server = jsonServer.start({
    data: 'data/db.json',
    deferredStart: true
});

gulp.task('sass', function() {
    return gulp.src('./app/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer('last 2 versions', 'ie 9'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./public/css'));
});

gulp.task('scripts', function() {
    return browserify('./app/js/app.js')
        .transform(html)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        //.pipe(uglify())
		.pipe(gulp.dest('./public/js'));
});

gulp.task('templates', function() {
  gulp.src('./app/templates/**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./public/'))
});

gulp.task('watch', function() {
    gulp.watch('./app/scss/**/*.scss', ['sass']);
    gulp.watch('./app/js/**/*.js', ['scripts']);
    gulp.watch('./app/templates/**/*.tpl', ['scripts']);
    gulp.watch('./app/templates/**/*.jade', ['templates']);
    gulp.watch(['db.json'], function(){
        server.reload();
    });
});

gulp.task('develop', function() {
    server.start();
});

gulp.task('default', [
    'sass',
    'scripts',
    'templates',
    'develop',
    'watch'
]);
