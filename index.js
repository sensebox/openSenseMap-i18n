'use strict';

const { join } = require('path'),
  { readdirSync } = require('fs'),
  fs = require('fs');
const path = join(__dirname, 'src');

// require en_US.json from each directory in src and return only
const translations = Object.create(null);
readdirSync(path)
  .filter(dir => fs.statSync(`${path}/${dir}`).isDirectory())
  .forEach(dir => translations[dir] = require(`${path}/${dir}/en_US.json`));

/**
 * Find a translation based on the path parameter. Tries to return the translation
 * for the key suffixed with _API, otherwise try to return the translation for the key.
 * @private
 * @param {string} path
 * @returns {Object} Object with the requested key and the translation as value
 * @throws Throws errors for invalid translation keys or missing translations
 */
const findTranslation = function findTranslation(path) {
  const [component, key] = path.split('.');

  if (!key) {
    for (const translationComponent of Object.values(translations)) {
      if (translationComponent[`${component}_API`]) {
        return { [component]: translationComponent[`${component}_API`] }
      } else if (translationComponent[component]) {
        return { [component]: translationComponent[component] }
      }
    }

    throw new Error();
  }

  if (!translations[component]) {
    throw new Error();
  }

  if (translations[component][`${key}_API`]) {
    return { [key]: translations[component][`${key}_API`] };
  } else { // use else to make sure the function throws
    return { [key]: translations[component][key] };
  }

}

/**
 * Retrieve translations for given translations keys
 * @param {...string} strings Keys of the wanted translations. Specify either as 'KEY' or 'component.KEY'.
 * @returns {Object} Object with all the requested keys and its translations in english
 * @throws Throws errors for invalid translation keys or missing translations
 */
const getTranslations = function getTranslations(...strings) {
  if (Array.isArray(strings[0])) {
    strings = strings[0]
  }

  let wantedTranslations = Object.create(null);

  for (const path of strings) {
    try {
      wantedTranslations = { ...wantedTranslations, ...findTranslation(path) };
    } catch (err) {
      throw new Error(`Invalid translation path ${path}. ${err.message}`);
    }
  }

  return wantedTranslations;
};

module.exports = getTranslations;
