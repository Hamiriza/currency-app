
const {
  getCurrencyList,
  getRatesLatest,
  getRatesHistoric,
} = require('./currencyApi');

test('getCurrencyList returns list of valid entries', async () => {
  const currencies = await getCurrencyList();

  const keys = Object.keys(currencies);
  for(const key of keys) {
    const currency = currencies[key];
    expect(currency.currency_code).toBe(key);
    expect(currency).toHaveProperty("currency_name");
    expect(currency).toHaveProperty("decimal_units");
  }
});

test('getRatesLatest returns valid data', async () => {
  const { rates } = await getRatesLatest("USD", ["EUR", "GBP"]);

  expect(rates).toHaveProperty("EUR");
  expect(rates).toHaveProperty("GBP");
});

test('getRatesHistoric returns valid data', async () => {
  const list = await getRatesHistoric("USD", ["EUR", "GBP"], 3);
  expect(list.length).toEqual(3);
  for(const { rates } of list) {
    expect(rates).toHaveProperty("EUR");
    expect(rates).toHaveProperty("GBP");
  }
});
