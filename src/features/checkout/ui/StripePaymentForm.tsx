import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import type { StripeCardElementChangeEvent } from '@stripe/stripe-js';
import { useState } from 'react';
import { Box, Stack } from '@chakra-ui/react';
import { StripeCheckoutButton } from './StripeCheckoutButton';
import { env } from '@/app/config';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '@/entities/cart';
import { useToaster } from '@/shared/hooks/useToaster';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#32325d',
      '::placeholder': { color: '#12a493' },
      fontFamily: 'inherit',
      padding: '12px 16px',
    },
    invalid: { color: '#e53e3e' },
  },
};

type StripePaymentFormProps = {
  amount: number;
};
export const StripePaymentForm = ({ amount }: StripePaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [cardComplete, setCardComplete] = useState(false);
  const navigate = useNavigate();
  const clearCart = useCartStore((state) => state.clearCart);
  const { showToast } = useToaster();

  const handleCardChange = (event: StripeCardElementChangeEvent) => {
    setCardComplete(event.complete);
  };

  const getPaymentIntentURL = () => {
    if (env.IS_DEV) {
      return `${env.STRIPE.API_BASE_URL}/create-payment-intent`;
    }
    return '/api/create-payment-intent';
  };

  const showSuccessToast = () => {
    showToast(
      'Payment successful',
      `Your payment of $${amount.toFixed(2)} has been processed successfully.`,
      'success'
    );
  };

  const showFailureToast = () => {
    showToast(
      'Payment not been processed.',
      `Your payment of $${amount.toFixed(2)} has not been processed.`,
      'warning'
    );
  };

  const showErrorToast = (message: string) => {
    showToast('Payment error', message, 'error');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentProcessing(true);
    try {
      if (!stripe || !elements) return;
      const res = await fetch(getPaymentIntentURL(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Math.round(amount * 100), currency: 'usd' }),
      });
      const { clientSecret } = await res.json();
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      });
      if (result.error) {
        showFailureToast();
      } else if (result.paymentIntent?.status === 'succeeded') {
        showSuccessToast();
        clearCart();
        navigate('/orders', { state: { amount, orderId: result.paymentIntent.id } });
      }
    } catch {
      showErrorToast('Please contact the author for more details.');
    } finally {
      setPaymentProcessing(false);
    }
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
          <CardElement options={CARD_ELEMENT_OPTIONS} onChange={handleCardChange} />
          <StripeCheckoutButton
            onClick={() => {
              const form = document.querySelector('form');
              if (form) {
                form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
              }
            }}
            loading={paymentProcessing}
            disabled={!stripe || !cardComplete || paymentProcessing}
          />
        </Stack>
      </form>
    </Box>
  );
};
