import { useState } from 'react';
import { Heading, Box, Flex, Stack, Text, HStack } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { BackButton } from '@/shared/ui/back-button';
import { StripePaymentForm } from '@/features/checkout';
import { Separator } from '@chakra-ui/react';
import { ShippingInfo, ShippingInfoForm } from '@/shared/ui/shipping-info-form';

const CheckoutSummary = () => {
  const location = useLocation();
  const { amount } = location.state || {};

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    fullName: '',
    streetAddress: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const handleShippingChange = (field: keyof ShippingInfo, value: string) => {
    setShippingInfo((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Flex minH="90vh" align="flex-start" justify="center" bg="gray.100" pt={16} px={4}>
      <Box maxW="500px" w="full" bg="white" p={8} rounded="md" shadow="md">
        <HStack mb={6}>
          <BackButton />
          <Heading size="xl" textAlign="center" flex="1">
            Checkout Summary
          </Heading>
        </HStack>
        <ShippingInfoForm values={shippingInfo} onChange={handleShippingChange} />
        <Stack mt={6}>
          <HStack>
            <Separator flex="1" variant="dashed" />
            <Heading size="lg" textAlign="center">
              Payment Info
            </Heading>
            <Separator flex="1" variant="dashed" />
          </HStack>
          <Flex justify="space-between" fontWeight="bold" mb={4} color={'teal.600'}>
            <Text>Total:</Text>
            <Text color={'red.500'}>${amount?.toFixed(2) || 0}</Text>
          </Flex>
          <StripePaymentForm amount={amount} />
        </Stack>
      </Box>
    </Flex>
  );
};

export default CheckoutSummary;
