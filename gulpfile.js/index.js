const { series } = require("gulp");
const { clean, merge, validate } = require("./tasks");

// function slaves() {
//   return src(["."], {
//     //add new languages here e.g. dist/pl_PL.json
//     allowEmpty: true,
//   }).pipe(
//     jsonschema("src/schema.json", {
//       banUnknownProperties: true,
//     })
//   );
// }

exports.validate = series(validate);
exports.default = series(clean, merge);
