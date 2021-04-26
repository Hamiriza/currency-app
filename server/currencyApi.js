
const axios = require('axios');

const apiKey = '0b5830d0274cddf279a9df33423813b1';
const url = service => `https://api.currencyscoop.com/v1/${service}?api_key=${apiKey}`;

async function getCurrencyList() {
  const endpoint = url('currencies');
  const { data: { response: { fiats } } } = await axios.get(endpoint);
  return fiats;
}

async function getRatesLatest(base, symbols) {
  const endpoint = url('latest') + `&symbols=${symbols.join(',')}&base=${base}`;
  const { data: { response: { rates, date } } } = await axios.get(endpoint);
  return { rates, date };
}

function padIntegerToTwo(num) {
  return num < 10 ? `0${num}` : `${num}`;
}

function formatDate(date) {
  return `${date.getUTCFullYear()}-${padIntegerToTwo(date.getUTCMonth()+1)}-${padIntegerToTwo(date.getUTCDate())}`;
}

async function getRatesHistoric(base, symbols, days) {
  const { rates: latestRates, date: latestDate } = await getRatesLatest(base, symbols);
  
  const dateIterator = new Date(latestDate);

  const allRates = [
    { rates: latestRates, date: formatDate(dateIterator) },
  ];

  for(let i = 1; i < days; i++) {
    dateIterator.setDate(dateIterator.getDate() - 1);
    const endpoint = url('historical') + `&symbols=${symbols.join(',')}&base=${base}&date=${formatDate(dateIterator)}`;
    const { data: { response: { date, rates } } } = await axios.get(endpoint);
    allRates.push({ rates, date });
  }
  return allRates;
}

module.exports = {
  getCurrencyList,
  getRatesLatest,
  getRatesHistoric,
};
