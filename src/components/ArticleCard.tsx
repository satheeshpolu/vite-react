import {
  Box,
  Image,
  Text,
  Link,
  Heading,
  Badge,
  Flex,
  Spacer,
  Stack,
} from "@chakra-ui/react";

type Article = {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: { id: string; name: string };
  title: string;
  url: string;
  urlToImage: string;
};

const ArticleCard = ({ article }: { article: Article }) => {
  const formattedDate = new Date(article.publishedAt).toLocaleString();

  return (
    <Box
      maxW="3xl"
      mx="auto"
      py={8}
      px={4}
      fontFamily="Georgia, serif"
      lineHeight="1.8"
      color="gray.800"
    >
      {/* Article Header */}

      <Text fontSize="lg" mb={4}>
        <strong>{article.title}</strong>
      </Text>
      <Flex mb={4} align="center" wrap="wrap">
        <Badge colorScheme="blue" mr={2}>
          {article.source?.name}
        </Badge>
        <Text fontSize="sm" color="gray.600" mr={2}>
          By {article.author || "Unknown Author"}
        </Text>
        <Spacer />
        <Text fontSize="sm" color="gray.500">
          {formattedDate}
        </Text>
      </Flex>

      {/* Article Image */}
      {article.urlToImage && (
        <Image
          src={article.urlToImage}
          alt={article.title}
          objectFit="cover"
          mb={6}
          borderRadius="md"
        />
      )}

      {/* Description */}
      <Text fontSize="sm" mb={4}>
        <strong>{article.description}</strong>
      </Text>

      {/* Main Content */}
      <Text fontSize="sm" mb={6}>
        {article.content?.replace(/(\r\n|\n|\r)/gm, "").replace(/<[^>]+>/g, "")}
      </Text>

      {/* Read More */}
      <Link
        href={article.url}
        isExternal
        color="blue.700"
        fontWeight="bold"
        fontSize="sm"
        target="_blank"
      >
        Read Full Article →
      </Link>
    </Box>
  );
};

export default ArticleCard;
