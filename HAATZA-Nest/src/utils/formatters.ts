export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDuration(minutes: number): string {
  const hrs = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  if (hrs > 0 && remaining > 0) return `${hrs}h ${remaining}m`;
  if (hrs > 0) return `${hrs} Hours`;
  return `${remaining} Mins`;
}
