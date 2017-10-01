var fs = require('fs');

var gulp = require('gulp');
var clean = require('gulp-clean');
var merge = require('gulp-merge-json');
var jsonminify = require('gulp-jsonminify');
var jsonschema = require('gulp-json-schema');

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
  return gulp.src('.tmp')
    .pipe(clean());
});

// Merges all language files from subdirectories
gulp.task('merge', function(){
  var files = getFiles('src');

  return files.map(function (file) {
    return gulp.src(`src/*/${file}`)
      .pipe(merge({
        fileName: `${file}`
      }))
      .pipe(gulp.dest('.tmp/'));
  });
});

// Lints merged files and checks if the required keys
// are available.
gulp.task('validate', function () {
  return gulp.src('.tmp/*.json')
    .pipe(jsonschema('src/schema.json'));
});

gulp.task('minify', ['validate'], function () {
  return gulp.src(['.tmp/*.json'])
    .pipe(jsonminify())
    .pipe(gulp.dest('dist'));
});

gulp.task('build', ['merge', 'minify' ]);