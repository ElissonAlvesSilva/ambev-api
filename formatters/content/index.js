const _ = require('lodash');

const ResponseError = require('../../utils/error/response-error');
const { emptyKeysMap, emptyKeysMapResponse } = require('./config/keys-map');

const normalizeData = (data) => {
  const keys = data.splice(0, 1)[0];

  if (!_.isEqual(keys, emptyKeysMap)) {
    throw new ResponseError({
      code: 0,
      message: `Error to read data. The pattern must be
      ${JSON.stringify(emptyKeysMap)}`,
    });
  }

  // remove trash
  data.splice(data.length - 1, 1);

  // normalize keys
  const normalized = mapKeys(data);

  return normalized;
};

// eslint-disable-next-line arrow-body-style
const mapKeys = (data, keysMapping = emptyKeysMapResponse) => {
  return _.transform(data, (result, value, key) => {
    const currentKey = keysMapping[key] || key;
    // eslint-disable-next-line no-undef
    result[currentKey] = _.isObject(value)
      ? mapKeys(value, keysMapping)
      : value.trim();
  });
};

const ContentFormatter = (data) => normalizeData(data);

module.exports = { ContentFormatter };
