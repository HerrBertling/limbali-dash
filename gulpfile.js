var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnext = require('cssnext');
var precss = require('precss');
var nano = require('gulp-cssnano');
var open = require('gulp-open');
var connect = require('gulp-connect');
var watch = require('gulp-watch');

gulp.task('css', function () {
    var processors = [
        autoprefixer({browsers: ['last 2 versions']}),
        cssnext,
        precss
    ];
    return gulp.src('./css/*.css')
        .pipe(postcss(processors))
        .pipe(nano())
        .pipe(gulp.dest('./dest'));
});

gulp.task('stream', function () {
    return gulp.src('css/**/*.css')
        .pipe(watch('css/**/*.css'))
        .pipe(gulp.dest('css'));
});

gulp.task('callback', function (cb) {
    watch('css/**/*.css', function () {
        gulp.src('css/**/*.css')
            .pipe(watch('css/**/*.css'))
            .on('end', cb);
    });
});

gulp.task('connect', function() {
    connect.server({
        port: 1337
    });
});

gulp.task('open', function(){
    gulp.src('./index.html')
    .pipe(open({
        app: 'Chrome'
    }));
});

gulp.task('default', ['connect', 'css', 'open', 'stream']);
