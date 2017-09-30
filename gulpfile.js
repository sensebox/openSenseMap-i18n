var gulp = require('gulp');
var merge = require('gulp-merge-json');
var jsonminify = require('gulp-jsonminify');

// Get files from subdirectories
function getFiles () {

}

// Merges all language files from subdirectories
gulp.task('merge', function(){
  return gulp.src('src/*/de_DE.json')
    .pipe(merge({
      fileName: 'de_DE.json'
    }))
    .pipe(gulp.dest('tmp/'));
});

// Lints merged files and checks if the required keys
// are available.
gulp.task('lint', function () {

});

gulp.task('minify', ['merge'], function () {
  return gulp.src(['tmp/*.json'])
    .pipe(jsonminify())
    .pipe(gulp.dest('build'));
});

gulp.task('build', [ 'merge', 'minify' ]);