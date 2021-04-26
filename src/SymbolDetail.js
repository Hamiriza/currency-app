import { useState, useEffect } from 'react';
import { getRatesHistoric } from './currencyApi';
import { getLocalSymbol } from './util';
import "./SymbolDetail.scss";

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('en-GB', { dateStyle: 'long' }).format(date);
}

function SymbolDetail({ baseSymbol, symbol: { currency_code, currency_name, decimal_units } }) {
  const [ historyDays, setHistoryDays ] = useState(1);
  const [ historyData, setHistoryData ] = useState(null);

  useEffect(() => {
    setHistoryData(null);
    getRatesHistoric(baseSymbol, [currency_code], historyDays).then((data) => {
      setHistoryData(data.map(({date, rates}) => ({
        date,
        rate: rates[currency_code]
      })));
    });
  }, [baseSymbol, historyDays, currency_code]);
  

  return (
    <div className="detail">
      <div className="symbol">{currency_code}</div>
      <div className="name">{currency_name}</div>
      <div className="selector">
        <div onClick={() => setHistoryDays(1)} className={historyDays === 1 ? 'active' : ''}>Today</div>
        <div onClick={() => setHistoryDays(3)} className={historyDays === 3 ? 'active' : ''}>Last 3 days</div>
        <div onClick={() => setHistoryDays(7)} className={historyDays === 7 ? 'active' : ''}>Last 7 days</div>
      </div>
      {
        historyData === null
          ? "Loading data..." : 
          <table>
            <thead>
              <tr><td>Date</td><td>Exchange rate</td></tr>
            </thead>
            <tbody>
              { historyData.map(row => <tr key={row.date}><td>{formatDate(row.date)}</td>{row.rate ? <td>{row.rate.toFixed(decimal_units)} {getLocalSymbol(currency_code)}</td> : <td>Unavailable</td>}</tr>) }
            </tbody>
          </table>
      }
    </div>
  );
}

export default SymbolDetail;
