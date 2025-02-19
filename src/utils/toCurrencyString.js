export const toCurrencyString = (n,  pos = 1, code = ' грн') => {
  const symbol = '₴ ';
  if (pos) return Number(n).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + code;
  return symbol + Number(n).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
}