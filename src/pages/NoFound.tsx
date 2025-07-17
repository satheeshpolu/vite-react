// pages/NoPage.tsx
import { Button, Center, Heading, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function NoFound() {
  const navigate  = useNavigate();

  const handleBack = () => {
    navigate ("/");
  };

  return (
    <Center minH="100vh" bg="gray.50" px={4}>
      <VStack>
        <Heading size="4xl" color="gray.700">
          404 - Page Not Found
        </Heading>
        <Text fontSize="lg" color="gray.600">
          Oops! The page you're looking for doesn't exist.
        </Text>
        <Button colorScheme="teal" variant="outline" onClick={handleBack}>
          Go back home
        </Button>
      </VStack>
    </Center>
  );
}
