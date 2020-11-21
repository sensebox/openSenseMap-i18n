const { src } = require("gulp");
const jsonschema = require("gulp-json-schema");

function validateSchema(opts) {
  return function validateSchema() {
    return src(opts).pipe(jsonschema("src/schema.json", {
      banUnknownProperties: true,
    }));
  }
}

module.exports = validateSchema;
