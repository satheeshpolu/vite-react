import { Box, Heading, Text, Stack, Button } from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';

const Orders = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Optionally, get order details from location.state
  const { orderId, amount } = location.state || {};

  return (
    <Box
      maxW="600px"
      mx="auto"
      display="flex"
      justifySelf={'center'}
      m={8}
      p={8}
      bg="white"
      borderRadius="md"
      boxShadow="md"
    >
      <Stack spacing={4} align="center">
        <Heading size="xl" mb={4} textAlign="center">
          Order Confirmation
        </Heading>
        {/* Animated Check Icon */}
        <Box mb={2}>
          <Box
            as="span"
            display="inline-block"
            width="64px"
            height="64px"
            bg="teal.100"
            borderRadius="full"
            position="relative"
            boxShadow="md"
          >
            <svg
              viewBox="0 0 64 64"
              width="64"
              height="64"
              style={{ position: 'absolute', top: 0, left: 0 }}
            >
              <circle
                cx="32"
                cy="32"
                r="30"
                fill="none"
                stroke="#14b8a6"
                strokeWidth="4"
                strokeDasharray="188"
                strokeDashoffset="0"
                style={{
                  animation: 'circleFadeIn 0.6s ease-out',
                  opacity: 0.8,
                }}
              />
              <polyline
                points="20,34 30,44 44,24"
                fill="none"
                stroke="#14b8a6"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="40"
                strokeDashoffset="40"
                style={{
                  animation: 'checkDraw 0.6s 0.3s forwards',
                  opacity: 1,
                }}
              />
            </svg>
          </Box>
        </Box>
        <Text fontSize="lg" color="teal.600">
          Thank you for your purchase!
        </Text>
        {orderId && <Text fontWeight="bold">Order ID: {orderId}</Text>}
        {amount && <Text fontWeight="bold">Amount Paid: ${amount.toFixed(2)}</Text>}
        <Text>
          Your order has been processed successfully. You will receive an email confirmation
          shortly.
        </Text>
        <Button variant="outline" onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </Stack>
      {/* CSS Animations */}
      <style>{`
        @keyframes circleFadeIn {
          0% { stroke-dashoffset: 188; opacity: 0; }
          100% { stroke-dashoffset: 0; opacity: 0.8; }
        }
        @keyframes checkDraw {
          0% { stroke-dashoffset: 40; }
          100% { stroke-dashoffset: 0; }
        }
      `}</style>
    </Box>
  );
};

export default Orders;
