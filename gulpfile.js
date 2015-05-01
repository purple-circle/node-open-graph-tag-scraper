var gulp = require("gulp");
var gutil = require("gulp-util");
var jshint = require("gulp-jshint");
var plumber = require('gulp-plumber');
var notify = require("gulp-notify");
var mocha = require("gulp-mocha");

var errorHandler = notify.onError("Error: <%= error.message %>");

gulp.task("lint", function() {
  return gulp.src(["index.js", "test/**/*"])
    .pipe(plumber({
      errorHandler: errorHandler
    }))
    .pipe(jshint())
    .pipe(jshint.reporter("default"))
    .on('error', gutil.beep)
    .pipe(notify(function(file) {
      if (!file.jshint) {
        return false;
      }
      if (file.jshint.success) {
        return false;
      }

      var errors = file.jshint.results.map(function(data) {
        if (data.error) {
          return "(" + data.error.line + ":" + data.error.character + ") " + data.error.reason;
        }
      }).join("\n");
      return file.relative + " (" + file.jshint.results.length + " errors)\n" + errors;
    }));
});


gulp.task('test', function () {
  return gulp.src('test/specs/**/*.js', {read: false})
    .pipe(mocha({reporter: 'spec'}));
});

gulp.task("watch", function() {
  gulp.watch(["index.js", "test/**/*"], ["lint"]);
});

gulp.task("watch-test", function() {
  gulp.watch(["index.js", "test/**/*"], ["lint", "test"]);
});
