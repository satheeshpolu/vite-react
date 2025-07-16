// pages/Home.tsx
import {
  Box,
  Heading,
  Text,
  Button,
  Stack,
  Flex,
  SimpleGrid,
  Icon,
  Container,
} from "@chakra-ui/react";
import { FaRocket, FaShieldAlt, FaUsers } from "react-icons/fa";

export default function Navbar() {
  return (
    <Box>
      {/* Hero Section */}
      <Flex
        align="center"
        justify="center"
        direction="column"
        textAlign="center"
        py={20}
        px={6}
        bgGradient="linear(to-r, blue.500, purple.500)"
        color="white"
      >
        <Heading fontSize="4xl" mb={4}>
          Welcome to MyApp
        </Heading>
        <Text fontSize="lg" maxW="600px" mb={6}>
          A modern React app powered by Chakra UI. Fast, responsive, and beautifully designed.
        </Text>
        <Stack direction="row" spacing={4}>
          <Button colorScheme="whiteAlpha" variant="outline" size="lg">
            Get Started
          </Button>
          <Button colorScheme="whiteAlpha" size="lg">
            Learn More
          </Button>
        </Stack>
      </Flex>

      {/* Features Section */}
      <Container maxW="6xl" py={20}>
        <Heading textAlign="center" mb={10}>
          Why Choose Us?
        </Heading>
        <SimpleGrid columns={[1, 2, 3]} spacing={10}>
          <Feature
            icon={<FaRocket size="24px" />}
            title="Fast Performance"
            text="Blazing fast with Vite + React 19.1"
          />
          <Feature
            icon={<FaShieldAlt size="24px" />}
            title="Secure & Reliable"
            text="Built with best security practices"
          />
          <Feature
            icon={<FaUsers size="24px" />}
            title="User Friendly"
            text="Simple and clean UI with Chakra"
          />
        </SimpleGrid>
      </Container>

      {/* Footer */}
      <Box py={6} textAlign="center" fontSize="sm" color="gray.500">
        © {new Date().getFullYear()} MyApp. All rights reserved.
      </Box>
    </Box>
  );
}

// Reusable Feature Card
function Feature({
  icon,
  title,
  text,
}: {
  icon: React.ReactElement;
  title: string;
  text: string;
}) {
  return (
    <Stack align="center" spacing={4} textAlign="center">
      <Flex
        w={12}
        h={12}
        align="center"
        justify="center"
        color="white"
        bg="blue.500"
        rounded="full"
      >
        <Icon as={() => icon} />
      </Flex>
      <Text fontWeight="bold" fontSize="lg">
        {title}
      </Text>
      <Text color="gray.600">{text}</Text>
    </Stack>
  );
}
