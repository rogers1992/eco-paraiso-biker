const currencyFormatter = new Intl.NumberFormat("es-BO", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatCurrency(amount: number): string {
  if (!Number.isFinite(amount)) return "Bs 0,00";
  return `Bs ${currencyFormatter.format(amount)}`;
}

export function formatPlainAmount(amount: number): string {
  if (!Number.isFinite(amount)) return "0,00";
  return currencyFormatter.format(amount);
}
