var gulp     = require('gulp'),
util         = require('gulp-util'),
browserSync  = require('browser-sync'),
jshint       = require('gulp-jshint'),
rename       = require('gulp-rename'),
sass         = require('gulp-sass'),
uglify       = require('gulp-uglify'),
fileinclude  = require('gulp-file-include'),
notify       = require('gulp-notify'),
autoprefixer = require('gulp-autoprefixer'),
include      = require('gulp-include');



////////////////////////////////////////////////////////////////////////////////
// sass
////////////////////////////////////////////////////////////////////////////////
gulp.task('sass', function() {
  return gulp.src('./build/scss/stylesheet.scss')
  .pipe(sass({outputStyle: 'compact'})
    .on("error", notify.onError(function (error) {
      return "Error - Sass: " + error.message;
    })))
  .pipe(autoprefixer('> 5%, last 2 versions', 'Firefox >= 30', 'Opera >= 12', 'Safari >= 5', 'Explorer >= 9'))
  .pipe(gulp.dest('./build/css'))
  .pipe(browserSync.stream({}))
  .pipe(notify({ message: "sass file: <%= file.relative %>"}));
});


////////////////////////////////////////////////////////////////////////////////
// html
////////////////////////////////////////////////////////////////////////////////
gulp.task('html', function() {
  return gulp.src(['./build/html/**/*.html', '!./build/html/**/_*.html'])
  .pipe(fileinclude({
    prefix: '@@',
    basepath: './build/html/'
  }).on("error", notify.onError(function (error) {
    return "Error - html include: " + error.message;
  })))
  .pipe(gulp.dest('./build/'))
  .pipe(browserSync.stream({}))
  .pipe(notify({ message: "html file: <%= file.relative %>"}));
});


////////////////////////////////////////////////////////////////////////////////
// js
////////////////////////////////////////////////////////////////////////////////
gulp.task('js', function(){

  var lint = gulp.src(['./build/js/site.js', './build/js/components/*.js'])
  .pipe(jshint())
  .pipe(jshint.reporter('default'));

  var js = gulp.src(['./build/js/site.js'])
  
  .pipe(include().on("error", notify.onError(function (error) {
    return "Error - js include: " + error.message;
  })))
  .pipe(rename({suffix: '.inc'}))
  .pipe(gulp.dest('./build/js'))
  .pipe(uglify().on("error", notify.onError(function (error) {
    return "Error - uglify: " + error.message;
  })))
  .pipe(rename({basename: 'site.min'},{suffix: ''}))
  .pipe(gulp.dest('./dist/js'))
  .pipe(notify({ message: "js file: <%= file.relative %>"}));

  return lint,js;

});


////////////////////////////////////////////////////////////////////////////////
// production task
////////////////////////////////////////////////////////////////////////////////
gulp.task('prod', ['sass','html','js'],function(){});


////////////////////////////////////////////////////////////////////////////////
// browser sync
////////////////////////////////////////////////////////////////////////////////
gulp.task('browser-sync', function() {
  browserSync.init({
    open: false,
    notify: false,
    server: {
      baseDir: "./",
      index: "/build/html/",
      directory: true
    }
  });
});


////////////////////////////////////////////////////////////////////////////////
// default gulp
////////////////////////////////////////////////////////////////////////////////
gulp.task('default', ['browser-sync'], function() {
  gulp.watch('build/scss/**/*.scss', ['sass']);
  gulp.watch('build/html/**/*.html', ['html']);
  gulp.watch('./*.html', browserSync.reload);
  gulp.watch('build/js/**/*.js', ['js'], browserSync.reload);
});
