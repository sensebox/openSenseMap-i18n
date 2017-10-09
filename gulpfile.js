var fs = require('fs');
var path = require('path');

var gulp = require('gulp');
var gutil = require('gulp-util');
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
  return gulp.src(['.tmp/de_DE.json','.tmp/en_US.json', '.tmp/es_CO.json'])
    .pipe(jsonschema('src/schema.json', {
      banUnknownProperties: true
    }));
});

gulp.task('minify', ['validate'], function () {
  return gulp.src(['.tmp/de_DE.json', '.tmp/en_US.json'])
    .pipe(jsonminify())
    .pipe(gulp.dest('dist'));
});

gulp.task('coverage', function () {
  function jsoncoverage (options) {
    return through.obj(function(file, encoding, callback) {
      let keysMaster = Object.keys(JSON.parse(fs.readFileSync(options.src, "utf8"))).length;
      let keysSlave = Object.keys(JSON.parse(file.contents.toString("utf8"))).length;

      let coverage = keysSlave / keysMaster * 100;
      let filename = path.basename(file.path)
      gutil.log(`Coverage for ${gutil.colors.red(filename)}:`, gutil.colors.magenta(coverage.toFixed(2)), '%', `Translated keys: ${keysSlave}/${keysMaster}`);

      callback(null, file);
    });
  }

  return gulp.src(['.tmp/*.json'])
    .pipe(jsoncoverage({src:'.tmp/en_US.json'}));
});

gulp.task('build', ['merge', 'minify' ]);