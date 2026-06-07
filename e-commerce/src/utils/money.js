 export function formatMoney(amountCents) {
    const amount = Number(amountCents) || 0;
    return `$${(amount / 100).toFixed(2)}`;
}
