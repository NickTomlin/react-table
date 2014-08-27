var gulp = require('gulp');
var browserify = require('browserify');
var streamify = require('gulp-streamify');
var source = require('vinyl-source-stream');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var CONFIG = {
  namespace: 'ReactTable',
  outfile: 'react-table.js'
};

function browserifyMain () {
  return browserify('./index.js')
    .bundle()
    .pipe(source(CONFIG.outfile))
    .pipe(gulp.dest('./dist'));
}

gulp.task('build', function () {
    return browserifyMain();
});

gulp.task('build:release', function () {
    return browserifyMain()
      .pipe(streamify(uglify()))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('./dist'));
});

gulp.task('dev', function () {
  gulp.watch(['./src/**/*.js'], ['build']);
});

gulp.task('default', ['dev']);
