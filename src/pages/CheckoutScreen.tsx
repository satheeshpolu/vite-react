import { useState } from 'react';
import { Heading, Box, Button, Flex, Stack, Text, Input } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { Field, defineStyle } from '@chakra-ui/react';
import UnderDevelopment from '../components/UnderDevelopment';
import { BackButton } from '@/components/shared';
import { StripePaymentForm } from '@/features/payments/stripe/components/StripePaymentForm';

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
const CheckoutScreen = () => {
  const location = useLocation();
  const { amount } = location.state || {};

  // State for each address field
  const [fullName, setFullName] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  // Check if all fields have some value
  // const isFormValid =
  //   fullName.trim() &&
  //   streetAddress.trim() &&
  //   city.trim() &&
  //   postalCode.trim() &&
  //   country.trim();

  return (
    <Flex minH="100vh" align="flex-start" justify="center" bg="gray.100" pt={24} px={4}>
      <Box maxW="500px" w="full" bg="white" p={8} rounded="md" shadow="md">
        {/* <UnderDevelopment /> */}
        <BackButton />

        <Heading size="lg" mb={8} textAlign="center">
          Order Summary
        </Heading>

        <Stack>
          <Flex justify="space-between" fontWeight="bold" mb={4} color={'teal.500'}>
            <Text>Total:</Text>
            <Text>${amount?.toFixed(2) || 0}</Text>
          </Flex>

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

          {/* <Button
            mt={4}
            width="full"
            color="#c9f9f4"
            variant="outline"
            onClick={() => alert('Under development...!')}
            bg="#14b8a6"
          >
            Place Order
          </Button> */}
          <StripePaymentForm />
        </Stack>
      </Box>
    </Flex>
  );
};

export default CheckoutScreen;
