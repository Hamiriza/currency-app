# Assignment

## Commands

To run the project use the following commands:

```
npm run build
npm run serve
```

For development use the following commands run side by side:

````
npm run start
npm run serve
```W

To run tests use these commands for FE and BE respectively:
````

npm run test-fe
npm run test-be

```

## Endpoint documentation

Backend exposes static files located in `build` directory and the following endpoints.

Endpoints use these parameters:

 - BASE - base currency symbol, e.g. EUR
 - SYMBOL_LIST - list of currency symbols, comma separated, e.g. USD,EUR
 - DAYS - integer number of days

 1. http://localhost:3030/api/currencies - list all available currency symbols
 1. http://localhost:3030/api/rates-latest/BASE/SYMBOL_LIST - fetch latest conversion rates for given symbol list, relative to given base symbol.
 1. http://localhost:3030/api/rates-historic/BASE/SYMBOL_LIST/DAYS - fetch last conversion rates for the last DAYS days for given symbol list, relative to given base symbol.

## Application structure

Application is bootstraped with `create-react-app` (see below for original readme) with BE based on expressjs.

Server is contained within the `server` directory while front-end sources are in `src`.

### Server

Routes are handled in `main.js` and api is handled in `currencyApi.js`.

### FE

App consists of components defined in `App.js`, `SymbolListing.js` and `SymbolDetail.js`.

React state was used to control the state of the application.

File `currencyApi.js` provides connection to the express endpoints defined above.

```
