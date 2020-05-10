const moment = require('moment');

const parseDate = (date) => {
  let parsedDate = '';
  parsedDate = moment(new Date(date), 'DD/MM/YYYY');
  parsedDate = parsedDate.format('YYYY-MM-DD');
  return parsedDate;
};

module.exports = { parseDate };
