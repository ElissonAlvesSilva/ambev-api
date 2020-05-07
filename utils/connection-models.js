const getConnection = (model) => {
  const { conn } = global;
  return conn.import(`${process.cwd()}/models/${model}.js`);
};

module.exports = { getConnection };
