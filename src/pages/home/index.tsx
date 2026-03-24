import { Box, Flex, Heading, Separator, Text, VStack } from '@chakra-ui/react';
import { CategoryGrid } from '@/widgets/category-grid';

const Section = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => (
  <Box h="95vh" w="100%">
    <Flex h="100%" direction={{ base: 'column', md: 'row' }} overflow="hidden">
      {/* Left Half */}
      <Box flex={1} borderRightRadius={{ md: '80px' }}>
        <VStack textAlign="center" px={4}>
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
        borderLeftRadius={{ md: '80px' }}
        zIndex={-1}
      >
        <Box transform="skewX(10deg)">
          <Box
            w="500px"
            h="500px"
            position="fixed"
            transform="rotate(50deg)"
            bg="teal.400"
            left={'10%'}
            borderRadius="35% 35% 35% 35% / 35% 35% 35% 35%"
            zIndex={-2}
            animation="spin 20s linear infinite"
          />
          <VStack textAlign="center" py={4}>
            <Heading fontSize={{ base: '3xl', md: '4xl' }}>{title}</Heading>
            <Text fontSize={{ base: 'md', md: 'lg' }} maxW="md">
              {subtitle}
            </Text>
          </VStack>
          <Separator variant="dashed" bgColor={'teal.500'} />
        </Box>
      </Box>
    </Flex>
  </Box>
);

export default function FullPageSections() {
  const sectionsData = [
    {
      bg: 'gray.100',
      title: 'Welcome to ShopEasy',
      subtitle:
        'Discover amazing products, unbeatable prices, and fast delivery, all in one place.',
    },
  ];
  return (
    <Box>
      {sectionsData.map((section, index) => (
        <Section key={index} title={section.title} subtitle={section.subtitle} />
      ))}
    </Box>
  );
}
