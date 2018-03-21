var fs = require('fs');
var path = require('path');

var gulp = require('gulp');
var clean = require('gulp-clean');
var merge = require('gulp-merge-json');
var jsonminify = require('gulp-jsonminify');
var jsonschema = require('gulp-json-schema');

var through = require('through2');

// Get files from subdirectories
function getFiles (dir, files_){
  files_ = files_ || [];
  var files = fs.readdirSync(dir);
  for (var i in files){
    var name = dir + '/' + files[i];
    if (fs.statSync(name).isDirectory()){
      getFiles(name, files_);
    } else {
      if (!files_.includes(files[i])) {
        files_.push(files[i]);
      }
    }
  }
  return files_;
}

// Clean up tmp folder
gulp.task('clean', function () {
  return gulp.src('dist')
    .pipe(clean());
});

// Merges all language files from subdirectories
gulp.task('merge', ['clean'], function(){
  var files = getFiles('src');

  return files.map(function (file) {
    return gulp.src(`src/*/${file}`)
      .pipe(merge({
        fileName: `${file}`
      }))
      .pipe(jsonminify())
      .pipe(gulp.dest('dist'));
  });
});

// Lints merged files and checks if the required keys
// are available.
gulp.task('validate-master', function () {
  return gulp.src(['dist/en_US.json', 'dist/de_DE.json'])
    .pipe(jsonschema('src/schema.json', {
      banUnknownProperties: true
    }));
});

gulp.task('validate-slaves', function () {
  return gulp.src(['']) //add new languages here e.g. dist/pl_PL.json
    .pipe(jsonschema('src/schema.json', {
      banUnknownProperties: true
    }));
});

gulp.task('validate', ['validate-master', 'validate-slaves']);
gulp.task('default', ['merge']);
