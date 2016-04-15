var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnext = require('cssnext');
var precss = require('precss');
var nano = require('gulp-cssnano');
var open = require('gulp-open');
var connect = require('gulp-connect');
var watch = require('gulp-watch');

var allSources = ['dest/*', '*.html', 'js/**/*.js'];

gulp.task('css', function () {
    var processors = [
        autoprefixer({browsers: ['last 2 versions']}),
        cssnext,
        precss
    ];
    gulp.src('./css/*.css')
        .pipe(postcss(processors))
        .pipe(nano())
        .pipe(gulp.dest('./dest'));
});

gulp.task('server', function () {
    connect.server({
        port: 1337,
        root: './',
        livereload: true
    });
});

gulp.task('prod-server', function () {
    connect.server({
        port: 8080,
        root: './',
        livereload: false
    });
});

gulp.task('open-browser', function(){
  gulp.src(__filename)
  .pipe(open({uri: 'http://localhost:1337'}));
});

gulp.task('livereload', function() {
  return gulp.src(allSources)
    .pipe(connect.reload());
});


gulp.task('watch', function() {
    gulp.watch(['*/**/*.css', '!dest/**/*'], ['css']);
    gulp.watch(allSources, ['livereload']);
})

gulp.task('default', ['server', 'open-browser', 'watch']);
gulp.task('prod', ['css', 'prod-server']);
