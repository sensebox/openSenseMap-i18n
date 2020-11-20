const { src } = require("gulp");
const clean = require("gulp-clean");

function cleanTask() {
  return src("dist").pipe(clean());
}

module.exports = cleanTask;
