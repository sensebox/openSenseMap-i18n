var fs = require('fs');
var path = require('path');

var gulp = require('gulp');
var gutil = require('gulp-util');
var clean = require('gulp-clean');
var merge = require('gulp-merge-json');
var jsonminify = require('gulp-jsonminify');
var jsonschema = require('gulp-json-schema');

var through = require('through2');

var PluginError = gutil.PluginError;

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

// Creating a stream through which each file will pass
const gulpAPIKeyRemover = through.obj(function(file, enc, cb) {
  if (file.isNull()) {
    // return empty file
    return cb(null, file);
  }

  if (file.isStream()) {
    this.emit('error', new PluginError('gulp-apikeyremover', 'Streaming not supported'));
    return cb();
  }

  if (file.isBuffer()) {
    const obj = JSON.parse(file.contents);

    Object.keys(obj)
      .filter(k => k.endsWith("_API"))
      .forEach(k => delete obj[k]);

    file.contents = Buffer.from(JSON.stringify(obj));
  }

  cb(null, file);
});

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
      .pipe(gulpAPIKeyRemover)
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

gulp.task('validate', ['validate-master']);
gulp.task('default', ['merge']);
