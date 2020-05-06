/* eslint-disable quote-props */
const keysMap = {
  'Nº doc.': 'doc',
  'Cl.custo': 'cost_control',
  'Cen.': 'kernel',
  'Centro cst': 'cost_center',
  'Dt.lçto.': 'created_at',
  'Usuário': 'user',
  'Material': 'material',
  'Texto breve material': 'description',
  'UML': 'uml',
  '   Valor/MObj': 'value_obj',
  '  Qtd.entr.': 'qtd_amount',
};

const emptyKeysMapResponse = {
  '__EMPTY_1': 'doc',
  '__EMPTY_2': 'cost_control',
  '__EMPTY_3': 'kernel',
  '__EMPTY_4': 'cost_center',
  '__EMPTY_5': 'created_at',
  '__EMPTY_6': 'user',
  '__EMPTY_7': 'material',
  '__EMPTY_8': 'description',
  '__EMPTY_9': 'uml',
  '__EMPTY_10': 'value_obj',
  '__EMPTY_11': 'qtd_amount',
};

const emptyKeysMap = {
  '__EMPTY_1': 'Nº doc.',
  '__EMPTY_2': 'Cl.custo',
  '__EMPTY_3': 'Cen.',
  '__EMPTY_4': 'Centro cst',
  '__EMPTY_5': 'Dt.lçto.',
  '__EMPTY_6': 'Usuário',
  '__EMPTY_7': 'Material',
  '__EMPTY_8': 'Texto breve material',
  '__EMPTY_9': 'UML',
  '__EMPTY_10': '   Valor/MObj',
  '__EMPTY_11': '  Qtd.entr.',
};

module.exports = {
  keysMap,
  emptyKeysMap,
  emptyKeysMapResponse,
};
