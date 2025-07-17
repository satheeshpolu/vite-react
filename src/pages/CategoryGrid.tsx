import {
  Box,
  Grid,
  Text,
  useColorModeValue,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { FaBoxOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const categories = [
  "beauty",
  "fragrances",
  "furniture",
  "groceries",
  "home-decoration",
  "kitchen-accessories",
  "laptops",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "mobile-accessories",
  "motorcycle",
  "skin-care",
  "smartphones",
  "sports-accessories",
  "sunglasses",
  "tablets",
  "tops",
  "vehicle",
  "womens-bags",
  "womens-dresses",
  "womens-jewellery",
  "womens-shoes",
  "womens-watches",
];

const formatCategory = (cat: string) =>
  cat
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

export default function CategoryGrid() {
  const navigate  = useNavigate();

  const cardBg = 'gray.100'; //useColorModeValue("gray.100", "gray.700");

  return (
    <Grid
      templateColumns={{
        base: "repeat(2, 1fr)",
        sm: "repeat(3, 1fr)",
        md: "repeat(4, 1fr)",
        lg: "repeat(6, 1fr)",
      }}
      gap={6}
      p={6}
    >
      {categories.map((category) => (
        <Box
          key={category}
          bg={cardBg}
          borderRadius="lg"
          boxShadow="md"
          p={4}
          textAlign="center"
          transition="all 0.2s"
          _hover={{ transform: "scale(1.05)", cursor: "pointer" }}
           onClick={() => navigate(`/cart/category/${category}`)}
        >
          <Flex justify="center" mb={2}>
            <Icon as={FaBoxOpen} w={6} h={6} color="teal.400" />
          </Flex>
          <Text fontWeight="semibold" fontSize="sm">
            {formatCategory(category)}
          </Text>
        </Box>
      ))}
    </Grid>
  );
}
