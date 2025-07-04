import { Box, Text, Flex, Icon } from "@chakra-ui/react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

type QuoteProps = {
  quote: string;
  author: string;
};

const QuoteCard = ({ quote, author }: QuoteProps) => {

  return (
    <Box
      maxW="lg"
      borderWidth="1px"
      borderRadius="2xl"
      overflow="hidden"
      p={6}
      bg={'#ffffff7a'}
      borderColor={'#60a5fa'}
      boxShadow="xl"
    >
      <Flex align="flex-start" mb={4}>
        <Icon as={FaQuoteLeft} boxSize={6} color="gray.400" mr={2} />
        <Text fontSize="xl" fontWeight="medium" lineHeight="tall">
          {quote}
        </Text>
        <Icon as={FaQuoteRight} boxSize={6} color="gray.400" ml={2} />
      </Flex>
      <Text fontSize="md" color="gray.500" textAlign="right" mt={4}>
        — {author}
      </Text>
    </Box>
  );
};

export default QuoteCard;
