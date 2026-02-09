// Stripe-related TypeScript types and interfaces

export interface StripePaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  client_secret: string;
}

export interface StripeCheckoutSession {
  id: string;
  url: string;
}
