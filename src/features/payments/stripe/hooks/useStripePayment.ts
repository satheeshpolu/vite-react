import { useState } from 'react';

export const useStripePayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startPayment = async (amount: number) => {
    setLoading(true);
    setError(null);
    // TODO: Call backend to create payment intent/session
    // and handle Stripe.js logic here
    setLoading(false);
  };

  return { loading, error, startPayment };
};
