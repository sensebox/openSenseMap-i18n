Contributing
=========================================
We are generally open for contributions and happy that you want to help translating openSenseMap! If you feel you are able to provide improvements or bug fixes by yourself, please do so by forking the repository and creating a [pull request]. Otherwise feel free to create an [issue].

## tl;dr
1. Fork it ( https://github.com/sensebox/openSenseMap-i18n/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`npm run commit`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request against branch `master`

## Git Commit Guidelines
We are following [AngularJS's commit message convention](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines) also known as [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog).

We use the [Commitizen CLI wizard](https://github.com/commitizen/cz-cli). To use the wizard, run `npm run commit` after staging your changes.

## Structure

You find all translations inside the `src` folder and it is sorted by `openSenseMap` components.

## Local development
Make sure you have the following tools installed:
- Node.Js v8
- npm

Fork, then clone the repo:

    git clone git@github.com:your-username/openSenseMap-API.git

To install all dependencies, run

    npm install

### Making changes

At this point, you can make changes to translations and run the test with

    npm test

#### Changing an existing translation

Find the translation you want to change and change it.

#### Adding new translation

1. Open `src/schema.json` and add a new entry to the `properties` object:
    ```json
    "TRANSLATION_KEY": {"type": "string"},
    ```

    More information about [JSON Schema](http://json-schema.org/)
2. Add the new key to the `required` array.
3. Finally add the new `key` and `translation` to the according translation file.

#### Adding a new language

1. Create new language files inside the component directories
2. Add new language to `validate-slaves` task in gulpfile.
    ```js
    gulp.src(['dist/new_language_key.json'])
    ```

### Build a new version locally

To build a new version locally, run

    npm build

You find the new generated translations inside the `dist` folder.