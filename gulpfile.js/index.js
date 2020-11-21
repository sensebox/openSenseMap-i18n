const { series } = require("gulp");
const { clean, merge, validateSchema } = require("./tasks");

// Main languages used by openSenseMap
const mainSchema = [
  "dist/de_DE.json",
  "dist/en_US.json"
];

// Add new languages here e.g. dist/pl_PL.json
const secondarySchema = [
  "."
]

exports.validate = series(validateSchema(mainSchema), validateSchema(secondarySchema));
exports.default = series(clean, merge);
