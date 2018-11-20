var gulp = require('gulp'),
  gutil = require('gulp-util'),
  webserver = require('gulp-webserver');

gulp.task('js', function() {
  gulp.src('builds/js/**/*');
});

gulp.task('html', function() {
  gulp.src('builds/*.html');
});

gulp.task('css', function() {
  gulp.src('builds/css/*.css');
});

gulp.task('watch', function() {
  gulp.watch('builds/js/**/*', ['js']);
  gulp.watch('builds/css/*.css', ['css']);
  gulp.watch(['builds/*.html',
    'builds/views/*.html'], ['html']);
});

gulp.task('webserver', function() {
  gulp.src('builds/')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('default', ['watch', 'html', 'js', 'css', 'webserver']);
