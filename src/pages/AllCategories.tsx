// import { useParams, useNavigate } from "react-router-dom";
// import { Button, VStack, Heading } from "@chakra-ui/react";
// import { useEffect } from "react";

// export default function AllCategories() {
//   const { category } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch(`https://dummyjson.com/products/category/${category}`)
//       .then((res) => res.json())
//       .then(console.log);
//   }, []);
//   return (
//     <VStack spacing={4} mt={8}>
//       <Heading size="md">Showing category: {category}</Heading>

//       <Button colorScheme="teal" onClick={() => navigate(-1)}>
//         ← Back
//       </Button>
//     </VStack>
//   );
// }

import {
  Box,
  Grid,
  Image,
  Text,
  Heading,
  VStack,
  Button,
  Stack,
  //   useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingSkeleton from "../components/LoadingSkeleton";
// 🧠 Example: This would come from your API or router loader
// const products = [
//   {
//     id: 154,
//     title: 'Black Sun Glasses',
//     description:
//       'The Black Sun Glasses are a classic and stylish choice that provide both UV protection and a fashionable look.',
//     category: 'sunglasses',
//     price: 29.99,
//     thumbnail: 'https://cdn.dummyjson.com/product-images/84/1.jpg',
//   },
//   {
//     id: 155,
//     title: 'Classic Sun Glasses',
//     description:
//       'The Classic Sun Glasses offer a timeless design with versatility for various occasions.',
//     category: 'sunglasses',
//     price: 24.99,
//     thumbnail: 'https://cdn.dummyjson.com/product-images/85/1.jpg',
//   },
//   // ... add other products
// ];

export default function AllCategory() {
  const { category } = useParams();
  const navigate = useNavigate();

  const cardBg = "#e0f0ee"; //useColorModeValue('white', 'gray.800');
  const borderColor = "gray.700"; //useColorModeValue('gray.200', 'gray.700');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/products/category/${category}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data?.products);
        setLoading(false);
      }); //setProducts(data)
  }, []);

  return (
    <Box p={6}>
      <Button
        mt={8}
        onClick={() => navigate(-1)}
        colorScheme="teal"
        variant="outline"
      >
        ← Back
      </Button>
      <Heading size="lg" mb={6}>
        Category: {category}
      </Heading>

      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={6}
      >
        {loading && (
          <>
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
          </>
        )}
        {products.map((product: any) => (
          <Box
            key={product?.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            bg={cardBg}
            borderColor={borderColor}
            shadow="md"
            _hover={{ transform: "scale(1.02)", transition: "0.2s" }}
          >
            <Image
              src={product?.thumbnail}
              alt={product?.title}
              objectFit="cover"
              w="100%"
              h="200px"
            />

            <Box p={4}>
              <VStack>
                <Heading fontSize="lg">{product.title}</Heading>

                <Text fontSize="sm" color="gray.600">
                  {product.description}
                </Text>

                <Stack
                  direction="row"
                  align="center"
                  justify="space-between"
                  w="full"
                >
                  <Text fontWeight="bold">${product.price}</Text>
                  <Button
                    size="sm"
                    colorScheme="teal"
                    onClick={() => console.log(product)}
                    variant="outline"
                  >
                    Add to Cart
                  </Button>
                </Stack>
              </VStack>
            </Box>
          </Box>
        ))}
      </Grid>
    </Box>
  );
}
