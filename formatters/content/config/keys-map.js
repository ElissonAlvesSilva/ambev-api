/* eslint-disable quote-props */
const keysMap = {
  'Cent': 'kernel',
  'Linha': 'line',
  'Vers': 'version',
  'Data': 'created_at',
  'Produt': 'product',
  'Descrição': 'description',
  'Volume': 'volume_pc',
  'UM': 'um',
  'Quantidade UN': 'qty_amount',
  'Volume HL': 'volume_hl',
  'Recurso': 'resource',
};

const emptyKeysMapResponse = {
  '__EMPTY': 'kernel',
  '__EMPTY_1': 'line',
  '__EMPTY_2': 'version',
  '__EMPTY_3': 'created_at',
  '__EMPTY_4': 'product',
  '__EMPTY_5': 'description',
  '__EMPTY_6': 'volume_pc',
  '__EMPTY_7': 'um',
  '__EMPTY_8': 'qty_amount',
  '__EMPTY_9': 'volume_hl',
  '__EMPTY_10': 'resource',
};

const emptyKeysMap = {
  '__EMPTY': 'Cent',
  '__EMPTY_1': 'Linha',
  '__EMPTY_2': 'Vers',
  '__EMPTY_3': 'Data',
  '__EMPTY_4': 'Produt',
  '__EMPTY_5': 'Descrição',
  '__EMPTY_6': 'Volume',
  '__EMPTY_7': 'UM',
  '__EMPTY_8': 'Quantidade UN',
  '__EMPTY_9': 'Volume HL',
  '__EMPTY_10': 'Recurso',
};

module.exports = {
  keysMap,
  emptyKeysMap,
  emptyKeysMapResponse,
};
