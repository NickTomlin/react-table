var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var streamify = require('gulp-streamify');
var connect = require('connect');
var http = require('http');
var source = require('vinyl-source-stream');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');


var CONFIG = {
  namespace: 'ReactTable',
  distDir: 'dist',
  outfile: 'react-table.js',
  port: 3111
};

function buildScript (inFilePath, outfileName, dest) {
  dest = dest || './dist';

  return browserify(inFilePath)
    .bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source(outfileName))
    .pipe(gulp.dest(dest));
}

gulp.task('build:dev', function () {
    return buildScript('./index.js', CONFIG.outfile);
});

gulp.task('build:release', function () {
    return buildScript('./index.js', CONFIG.outfile)
      .pipe(streamify(uglify()))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(CONFIG.distDir));
});

gulp.task('build:examples', function () {
    return buildScript('./examples/app.js', 'app.built.js', './examples/public');
});

gulp.task('serve', ['build:examples'], function (cb) {
  var connectRoute = require('connect-route');
  var app = connect()
    .use(connect.logger('dev'))
    .use(connect.static('./examples'))
    .use(connect.static('./dist'))
    .use(connectRoute(function (router) {
      router.get('/data', function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(
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
  gulp.watch(['./src/**/*.js'], ['build:dev', 'build:examples']);
  gulp.watch(['./examples/*.js'], ['build:examples']);
  // .start as alternative to .run http://stackoverflow.com/a/23298810/1048479
  gulp.start('serve');
});

gulp.task('default', ['dev']);
