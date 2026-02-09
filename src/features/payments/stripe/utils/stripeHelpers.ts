// Utility functions for Stripe integration

export const formatAmountForStripe = (amount: number, currency: string = 'usd') => {
  // Stripe expects amounts in the smallest currency unit
  if (currency === 'usd') return Math.round(amount * 100);
  // Add more currency logic as needed
  return amount;
};
