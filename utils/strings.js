const replaceCurrency = (currency) => {
  if (!currency) {
    return null;
  }
  return currency.toString().replace(/\./g, '').replace(',', '.');
};

module.exports = { replaceCurrency };
