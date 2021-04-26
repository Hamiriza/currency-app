const express = require('express');
const path = require('path');
const api = require('./currencyApi');
const cors = require('cors')
const app = express();

app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(cors());

app.get('/api/currencies', async (_, res) => {
  try {
    res.json(await api.getCurrencyList());
  }catch(e) {
    res.status(500);
    res.end('Server encountered a problem fetching data from an external API.');
  }
});

app.get('/api/rates-latest/:base/:symbols', async (req, res) => {
  try {
    res.json(await api.getRatesLatest(req.params.base, req.params.symbols.split(',')));
  }catch(e) {
    res.status(500);
    res.end('Server encountered a problem fetching data from an external API.');
  }
});

app.get('/api/rates-historic/:base/:symbols/:days', async (req, res) => {
  const daysStr = req.params.days;
  const days = parseInt(daysStr, 10);

  if(`${days}` !== daysStr) {
    res.status(400);
    res.end('Invalid "days" parameter.');
    return;
  }

  if(days > 7) {
    res.status(400);
    res.end('Only last 7 days may be queried.');
    return;
  }

  try {
    res.json(await api.getRatesHistoric(req.params.base, req.params.symbols.split(','), days));
  }catch(e) {
    res.status(500);
    res.end('Server encountered a problem fetching data from an external API.');
  }
});

app.listen(3030)
