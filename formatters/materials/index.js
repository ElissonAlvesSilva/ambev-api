const _ = require('lodash');

const { keysMap } = require('./config/keys-map');

// eslint-disable-next-line arrow-body-style
const mapKeys = (data, keysMapping = keysMap) => {
  return _.transform(data, (result, value, key) => {
    const currentKey = keysMapping[key] || key;
    // eslint-disable-next-line no-undef
    result[currentKey] = _.isObject(value)
      ? mapKeys(value, keysMapping)
      : value;
  });
};

const MaterialsFormatter = (data) => mapKeys(data);

module.exports = { MaterialsFormatter };
