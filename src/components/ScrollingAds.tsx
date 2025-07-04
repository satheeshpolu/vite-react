import { Box, Text, Image, VStack, Heading, Link } from "@chakra-ui/react";
import "./ScrollingAds.css"; // Import your CSS
import IconMeta from '../../src/assets/meta.png';
const ads = [
  {
    name: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    message: "Explore AI & Cloud with Google.",
    link: "https://cloud.google.com/",
  },
  {
    name: "Meta",
    logo: IconMeta,
    message: "Join the future of the Metaverse.",
    link: "https://about.meta.com/",
  },
  {
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    message: "Empower your productivity with Microsoft 365.",
    link: "https://www.microsoft.com/",
  },
  {
    name: "Amazon AWS",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
    message: "Build scalable apps with AWS.",
    link: "https://aws.amazon.com/",
  },
];

const ScrollingAds = () => {
  return (
    <Box
      className="scroll-wrapper"
      w="full"
      maxW="xs"
      h="92vh"
      overflow="hidden"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="2xl"
      boxShadow="md"
      bg="white"
    >
      <Box className="scroll-ads-container">
        {[...ads, ...ads].map((ad, i) => (
          <Box
            key={i}
            borderRadius="xl"
            p={4}
            border="1px solid"
            borderColor="gray.100"
            bg="gray.50"
            _hover={{ bg: "gray.100" }}
            mx={3}
          >
            <VStack align="start">
              <Image
                src={ad.logo}
                alt={ad.name}
                boxSize="40px"
                objectFit="contain"
              />
              <Heading size="sm">{ad.name}</Heading>
              <Text fontSize="sm" color="gray.600">
                {ad.message}
              </Text>
              <Link
                href={ad.link}
                fontSize="sm"
                color="blue.500"
                fontWeight="bold"
                target="_blank"
              >
                Learn More →
              </Link>
            </VStack>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ScrollingAds;
