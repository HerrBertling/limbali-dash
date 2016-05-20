var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnext = require('cssnext');
var precss = require('precss');
var nano = require('gulp-cssnano');
var open = require('gulp-open');
var connect = require('gulp-connect');
var watch = require('gulp-watch');
var htmlmin = require('gulp-htmlmin');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var ghPages = require('gulp-gh-pages');

var allSources = ['postcss/*', '*.html', 'js/**/*.js'];

gulp.task('css', function () {
    var processors = [
        autoprefixer({browsers: ['last 2 versions']}),
        cssnext,
        precss
    ];
    gulp.src('./postcss/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./css'));
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

gulp.task('useref', function(){
    return gulp.src('*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', nano()))
        .pipe(gulp.dest('./dist'))
});

gulp.task('copyfonts', function() {
    return gulp.src('./node_modules/weather-icons/font/**/*.{eot,ttf,woff,woff2,svg}')
        .pipe(gulp.dest('./dist/font'));
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
    gulp.watch(['*/**/*.css', '!dist/**/*'], ['css']);
    gulp.watch(allSources, ['livereload']);
})

gulp.task('deploy', function() {
    return gulp.src('./dist/**/*')
        .pipe(ghPages());
});

gulp.task('build', ['css', 'copyfonts', 'useref', 'deploy']);

gulp.task('default', ['server', 'open-browser', 'watch']);
gulp.task('prod', ['css', 'prod-server']);
