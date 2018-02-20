# openSenseMap-i18n

Messages and translations used in openSenseMap and openSenseMap-API

## Consuming these strings

### Static frontend project
- TODO

### Node.js project

```js
const i18n = require('@sensebox/openSenseMap-i18n');
const { ACCOUNT_CREDENTIALS_INVALID, NOTIFICATION_USER_UPDATE_FAILED } = i18n('ACCOUNT_CREDENTIALS_INVALID', 'user.NOTIFICATION_USER_UPDATE_FAILED');
```

## Structure of `src/`

- required_keys.json // contains required keys
- user
  - de_DE.json
  - en_US.json
- box
- header
- explore
- interpolation
- filter
- download
- map
- info
- misc

## API response messages

Each key can be overwritten for the API by adding new keys to the `en_US.json` file with trailing `_API` for the key name. (For example `USER_PASS_INCORRECT` is overwritten by `USER_PASS_INCORRECT_API`). These keys will be left out in the built and minified translation json files. The API will use these transparently by just using the original key.

## License

MIT 2017
