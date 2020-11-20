const { src } = require("gulp");
const jsonschema = require("gulp-json-schema");

function validate() {
  return src(["dist/en_US.json", "dist/de_DE.json"]).pipe(
    jsonschema("src/schema.json", {
      banUnknownProperties: true,
    })
  );
}

module.exports = validate;
