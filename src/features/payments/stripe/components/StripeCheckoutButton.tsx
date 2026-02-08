import React from 'react';

interface StripeCheckoutButtonProps {
  onClick: () => void;
  loading?: boolean;
}

export const StripeCheckoutButton: React.FC<StripeCheckoutButtonProps> = ({ onClick, loading }) => (
  <button
    onClick={onClick}
    disabled={loading}
    style={{
      background: '#14b8a6',
      color: '#fff',
      padding: '12px 24px',
      borderRadius: 6,
      border: 'none',
      fontWeight: 600,
      cursor: 'pointer',
    }}
  >
    {loading ? 'Processing...' : 'Pay with Stripe'}
  </button>
);
