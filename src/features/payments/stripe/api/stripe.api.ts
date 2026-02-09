// Example: API call to your backend to create a Stripe payment intent or session
import axios from 'axios';

export const createStripePaymentIntent = async (amount: number) => {
  // Replace with your backend endpoint
  const response = await axios.post('/create-payment-intent', { amount });
  return response.data;
};

export const createStripeCheckoutSession = async (data: any) => {
  // Replace with your backend endpoint
  const response = await axios.post('/create-checkout-session', data);
  return response.data;
};
