import { useState, useEffect } from 'react';
import { getRatesLatest } from './currencyApi';
import { getLocalSymbol } from './util';
import "./SymbolListing.scss";

function SymbolListing({ currencyList, baseSymbol, onSymbolClick }) {
  const [rates, setRates] = useState(null);

  useEffect(() => {
    getRatesLatest(baseSymbol, Object.keys(currencyList)).then(({ rates }) => {
      setRates(rates);
    });
  }, [baseSymbol]);

  return (
    <div className="listing">
      { !rates ? "Loading rates..." : 
        Object.values(currencyList).map(
          ({currency_code, currency_name, decimal_units}) => {
            const rate = rates[currency_code];
            
            const localSymbol = getLocalSymbol(currency_code);

            const rateStr = rate ? `${rate.toFixed(decimal_units)} ${localSymbol !== currency_code ? localSymbol : ''}` : "Unavailable";
            return <div className="listing-tile" key={currency_code} data-testid={`tile-currency-${currency_code}`} onClick={() => onSymbolClick(currency_code)}>
              <div className="rate">{rateStr}</div>
              <div className="symbol">{currency_code}</div>
              <div className="name">{currency_name}</div>
            </div>
          }
        )
      }
    </div>
  );
}

export default SymbolListing;
