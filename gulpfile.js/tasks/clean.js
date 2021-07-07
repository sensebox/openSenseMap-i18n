const { src } = require("gulp");
const clean = require("gulp-clean");

function cleanTask() {
  return src("dist", { allowEmpty: true }).pipe(clean());
}

module.exports = cleanTask;
