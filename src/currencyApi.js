
const axios = require('axios');

const baseUrl = "http://localhost:3030/api";

export async function getCurrencyList() {
  const endpoint = `${baseUrl}/currencies`;
  const { data } = await axios.get(endpoint);
  return data;
}

export async function getRatesLatest(base, symbols) {
  const endpoint = `${baseUrl}/rates-latest/${base}/${symbols.join(',')}`;
  const { data } = await axios.get(endpoint);
  return data;
}

export async function getRatesHistoric(base, symbols, days) {
  const endpoint = `${baseUrl}/rates-historic/${base}/${symbols.join(',')}/${days}`;
  const { data } = await axios.get(endpoint);
  return data;
}
