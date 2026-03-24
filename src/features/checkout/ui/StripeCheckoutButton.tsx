import { IconButton } from '@chakra-ui/react';
import React from 'react';
import { FaShieldAlt } from 'react-icons/fa';

interface StripeCheckoutButtonProps {
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export const StripeCheckoutButton: React.FC<StripeCheckoutButtonProps> = ({
  onClick,
  loading,
  disabled,
}) => (
  <IconButton
    aria-label="Call support"
    key={'solid'}
    variant={'solid'}
    colorScheme="teal"
    backgroundColor={'teal.500'}
    color="#fff"
    onClick={onClick}
    disabled={disabled}
    mt={8}
  >
    <FaShieldAlt size={32} />

    {loading ? 'Processing...' : 'Pay with Stripe'}
  </IconButton>
);
