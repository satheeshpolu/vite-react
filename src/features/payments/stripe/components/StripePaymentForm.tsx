import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { Box, Stack } from '@chakra-ui/react';
import { StripeCheckoutButton } from './StripeCheckoutButton';
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#32325d',
      '::placeholder': { color: '#14b8a6' },
      fontFamily: 'inherit',
      padding: '12px 16px',
    },
    invalid: { color: '#e53e3e' },
  },
};

export const StripePaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    // Dummy client secret for test, replace with real one from backend
    const clientSecret = 'sk_test_dummy_secret'; //TODO

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
      },
    });

    if (result.error) {
      alert(result.error.message);
    } else if (result.paymentIntent?.status === 'succeeded') {
      alert('Payment successful!');
    }
    setLoading(false);
  };

  return (
    <Box maxW="500px" w="100%" p={6} bg="white" borderRadius="md" boxShadow="md">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
      >
        <Stack gap={4}>
          <CardElement options={CARD_ELEMENT_OPTIONS} />
          <StripeCheckoutButton
            onClick={() => {
              // Manually trigger form submission
              const form = document.querySelector('form');
              if (form) {
                form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
              }
            }}
            loading={loading}
          />
        </Stack>
      </form>
    </Box>
  );
};
