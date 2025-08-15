
export function formatCurrency(amount, locale) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: getCurrencyCode(locale),
  }).format(amount);
}

export function formatDate(date, locale) {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium"
  }).format(date);
}

function getCurrencyCode(locale) {
  const map = {
    en: "USD",
    hi: "INR"
  };
  return map[locale] || "USD";
}
