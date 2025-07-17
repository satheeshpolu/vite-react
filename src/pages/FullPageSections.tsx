import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import CategoryGrid from './CategoryGrid';
import ShoppingCartAnimation from "./ShoppingCartAnimation";

const Section = ({
  // bg,
  title,
  subtitle,
}: {
  // bg: string;
  title: string;
  subtitle: string;
}) => (
  <Box  h="95vh" w="100%">
    <Flex h="100%" direction={{ base: "column", md: "row" }} overflow="hidden">
      {/* Left Half */}
      <Box
        flex={1}
        // bg="gray.100"
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRightRadius={{ md: "80px" }}
      >
        <VStack textAlign="center" px={4}>
          <Heading fontSize={{ base: "3xl", md: "4xl" }}>{title}</Heading>
          <Text fontSize={{ base: "md", md: "lg" }} maxW="md">
            {subtitle}
          </Text>
          <CategoryGrid />
        </VStack>
      </Box>

      {/* Right Half with Tilt and Rounded Edge */}
      <Box
        flex={1}
        position="relative"
        overflow="hidden"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="teal.500"
        transform="skewX(-20deg)"
        borderLeftRadius={{ md: "80px" }}
        zIndex={-1}
      >
        <Box transform="skewX(10deg)">

          <ShoppingCartAnimation />
        </Box>
      </Box>
    </Flex>
  </Box>
);


export default function FullPageSections() {
  // const bg1 = "gray.100";
  // const bg2 = "white";
  // const bg3 = "teal.50";
  const sectionsData = [
    {
      bg: "gray.100",
      title: "Welcome to ShopEasy",
      subtitle: "Discover amazing products, unbeatable prices, and fast delivery—all in one place.",
    },
    // {
    //   bg: "white",
    //   title: "About Us",
    //   subtitle: "We build amazing UIs with Chakra and React.",
    // },
    // {
    //   bg: "teal.50",
    //   title: "Get in Touch",
    //   subtitle: "Contact us to start building something great together.",
    // },
  ];
  return (
    <Box>
      {sectionsData.map((section, index) => (
        <Section
          key={index}

          title={section.title}
          subtitle={section.subtitle}
        />
      ))}
    </Box>
  );
}
