import { useState, useEffect } from 'react';
import { getCurrencyList } from './currencyApi';
import SymbolListing from './SymbolListing';
import SymbolDetail from './SymbolDetail';
import './App.scss';

function App() {
  const [baseSymbol, setBaseSymbol] = useState("EUR");
  const [viewedSymbol, setViewedSymbol] = useState(null);
  
  const [currencyList, setCurrencyList] = useState(null);
  useEffect(() => {
    getCurrencyList().then(setCurrencyList);
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <span>Assesment</span>
        <a className="app-link" href="#" onClick={() => setViewedSymbol(null)}>Currencies</a>
        <div className="app-dropdown">
          Base:
          <select 
            data-testid="baseDropdown"
            value={baseSymbol}
            onChange={event => setBaseSymbol(event.target.value)}
          >
            { currencyList ? Object.keys(currencyList).map(symbol => <option key={symbol} value={symbol}>{symbol}</option>) : null }
          </select>
        </div>
      </header>
      { 
        (currencyList && viewedSymbol)
        ? <SymbolDetail baseSymbol={baseSymbol} symbol={currencyList[viewedSymbol]}></SymbolDetail> 
        : (
          currencyList 
          ? <SymbolListing baseSymbol={baseSymbol} currencyList={currencyList} onSymbolClick={setViewedSymbol}></SymbolListing> 
          : <div className="loading">Loading symbols...</div>
        ) 
      }
    </div>
  );
}

export default App;
