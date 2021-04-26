
export function getLocalSymbol(currency) {
  const parts = new Intl.NumberFormat('en-US', { style: 'currency', currency, currencyDisplay: 'narrowSymbol' }).formatToParts(1);
  return parts.find(p => p.type === "currency")?.value;
}
