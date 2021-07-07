const fs = require("fs");
const { src, dest } = require("gulp");
const merge = require("gulp-merge-json");
const jsonminify = require("gulp-jsonminify");

// Get files from subdirectories
function getFiles(dir, files_) {
  files_ = files_ || [];
  var files = fs.readdirSync(dir);
  for (var i in files) {
    var name = dir + "/" + files[i];
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files_);
    } else {
      if (!files_.includes(files[i])) {
        files_.push(files[i]);
      }
    }
  }
  return files_;
}

function copy() {
  const files = getFiles("src");
  return files.map((file) => {
    return src(`src/*/${file}`)
      .pipe(
        merge({
          fileName: `${file}`,
        })
      )
      .pipe(jsonminify())
      .pipe(dest("dist"));
  });
}

function mergeTask() {
  return Promise.resolve(copy());
}

module.exports = mergeTask;
