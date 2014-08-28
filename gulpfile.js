var gulp = require('gulp');
var browserify = require('browserify');
var streamify = require('gulp-streamify');
var connect = require('connect');
var http = require('http');
var source = require('vinyl-source-stream');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');


var CONFIG = {
  namespace: 'ReactTable',
  outfile: 'react-table.js',
  port: 3111
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

gulp.task('serve', function (cb) {
  var connectRoute = require('connect-route');
  var app = connect()
    .use(connect.logger('dev'))
    .use(connect.static('./examples'))
    .use(connect.static('./dist'))
    .use(connectRoute(function (router) {
      router.get('/data', function (req, res) {
        for (var p in res) {
          if (typeof p === 'function') console.log(p);
        }
        res.setHeader('Content-Type', 'application/json');
        res.end(
          JSON.stringify(
          {
          "hello": "world"
          }
        ));
      });
    }));

    http.createServer(app)
      .listen(CONFIG.port)
      .on('close', cb);
});

gulp.task('dev', function () {
  gulp.watch(['./src/**/*.js'], ['build']);
});

gulp.task('default', ['dev']);
