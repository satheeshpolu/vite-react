import { useState } from 'react';
import { Heading, Box, Flex, Stack, Text, Input, HStack } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { Field, defineStyle } from '@chakra-ui/react';
import { BackButton } from '@/components/shared';
import { StripePaymentForm } from '@/features/payments/stripe/components/StripePaymentForm';
import { Separator } from '@chakra-ui/react';

const floatingStyles = defineStyle({
  pos: 'absolute',
  bg: 'bg',
  px: '0.5',
  top: '-3',
  insetStart: '2',
  fontWeight: 'normal',
  pointerEvents: 'none',
  transition: 'position',
  _peerPlaceholderShown: {
    color: 'fg.muted',
    top: '2.5',
    insetStart: '3',
  },
  _peerFocusVisible: {
    color: 'fg',
    top: '-3',
    insetStart: '2',
  },
});
const CheckoutSummary = () => {
  const location = useLocation();
  const { amount } = location.state || {};
  // console.log('Checkout Amount:', amount);
  // State for each address field
  const [fullName, setFullName] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  return (
    <Flex minH="90vh" align="flex-start" justify="center" bg="gray.100" pt={16} px={4}>
      <Box maxW="500px" w="full" bg="white" p={8} rounded="md" shadow="md">
        <HStack mb={6}>
          <BackButton />
          <Heading size="xl" textAlign="center" flex="1">
            Checkout Summary
          </Heading>
        </HStack>
        <HStack mb={2}>
          <Separator flex="1" variant="dashed" />
          <Heading size="lg" textAlign="center">
            Shipping Info
          </Heading>

          <Separator flex="1" variant="dashed" />
        </HStack>
        <Stack>
          <Field.Root>
            <Box pos="relative" w="full">
              <Input
                className="peer"
                placeholder=""
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <Field.Label css={floatingStyles}>Full Name</Field.Label>
            </Box>
            <Box pos="relative" w="full">
              <Input
                className="peer"
                placeholder=""
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
              />
              <Field.Label css={floatingStyles}>Street Address</Field.Label>
            </Box>
            <Box pos="relative" w="full">
              <Input
                className="peer"
                placeholder=""
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <Field.Label css={floatingStyles}>City</Field.Label>
            </Box>
            <Box pos="relative" w="full">
              <Input
                className="peer"
                placeholder=""
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
              <Field.Label css={floatingStyles}>Postal Code</Field.Label>
            </Box>
            <Box pos="relative" w="full">
              <Input
                className="peer"
                placeholder=""
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
              <Field.Label css={floatingStyles}>Country</Field.Label>
            </Box>
          </Field.Root>
          <HStack>
            <Separator flex="1" variant="dashed" />
            <Heading size="lg" textAlign="center">
              Payment Info
            </Heading>

            <Separator flex="1" variant="dashed" />
          </HStack>
          <Flex justify="space-between" fontWeight="bold" mb={4} color={'teal.500'}>
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
