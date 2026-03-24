import {
  Box,
  Badge,
  Button,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { WeeklyBuyersChart } from '@/widgets/weekly-buyers-chart';
import { FaCartPlus, FaShare } from 'react-icons/fa6';
import useShareProduct from '@/hooks/useShareProduct';
import { BackButton } from '@/shared/ui/back-button';
import { useProduct } from '@/hooks/useProduct';
import { useAddToCart } from '@/features/add-to-cart';
import { LoadingSkeleton } from '@/shared/ui/loading-skeleton';

export default function ProductDetails() {
  const [mainImage, setMainImage] = useState<string | undefined>();
  const { shareProduct } = useShareProduct();
  const { id } = useParams();

  const { addToCart } = useAddToCart();

  const { data: productResponse, isLoading } = useProduct(Number(id) || 0);
  const product = productResponse ?? null;

  useEffect(() => {
    setMainImage(productResponse?.thumbnail || productResponse?.images?.[0]);
  }, [productResponse]);

  if (isLoading) {
    return (
      <Box p={8}>
        <LoadingSkeleton />
      </Box>
    );
  }

  if (!product) return null;

  return (
    <Box p={{ base: 4, md: 8 }} maxW="6xl" mx="auto" bg="white" rounded="xl" boxShadow="lg">
      <BackButton />
      <Button
        type="submit"
        alignSelf="flex-start"
        variant="outline"
        color="rgba(32, 134, 125, 1)"
        onClick={() => addToCart(product)}
        ml={4}
        mr={4}
      >
        <FaCartPlus />
      </Button>
      {/* Share icon on the left */}
      <Button colorScheme="teal" variant="outline">
        <FaShare size={24} color="rgba(32, 134, 125, 1)" onClick={() => shareProduct(product)} />
      </Button>

      <SimpleGrid columns={{ base: 1, md: 2 }}>
        {/* Images Section */}
        <VStack align="start">
          <Image
            src={mainImage}
            alt={product.title}
            borderRadius="md"
            w="100%"
            h="auto"
            objectFit="cover"
            transition="all 0.3s"
          />

          <HStack wrap="wrap">
            {product.images?.slice(0, 5).map((img: string, idx: number) => (
              <Image
                key={idx}
                src={img}
                alt={`Product ${idx + 1}`}
                boxSize="75px"
                objectFit="cover"
                borderRadius="md"
                border={mainImage === img ? '2px solid teal' : '1px solid #eee'}
                cursor="pointer"
                onClick={() => setMainImage(img)}
                _hover={{ transform: 'scale(1.05)' }}
              />
            ))}
          </HStack>
        </VStack>

        {/* Details Section */}
        <VStack align="start">
          <Heading size="lg">{product.title}</Heading>
          <Text color="gray.600" fontSize="md">
            <strong>Brand:</strong> {product.brand} | <strong>Category:</strong>{' '}
            {product.category}
          </Text>

          <HStack>
            <Text fontSize="2xl" fontWeight="bold" color="teal.600">
              ${product.price}
            </Text>
            <Badge colorScheme="green" fontSize="0.9em">
              -{product.discountPercentage}%
            </Badge>
          </HStack>

          <Text fontSize="md" color="gray.700">
            {product.description}
          </Text>
          <Box p="8px" />

          <Badge
            colorScheme={product.availabilityStatus === 'In Stock' ? 'teal' : 'red'}
            fontSize="0.9em"
            colorPalette={product.availabilityStatus === 'In Stock' ? 'green' : 'red'}
          >
            {product.availabilityStatus}
          </Badge>

          <Stack fontSize="sm" color="gray.600">
            <Text>Stock: {product.stock}</Text>
            <Text>Min Order: {product.minimumOrderQuantity}</Text>
            <Text>Weight: {product.weight} kg</Text>
          </Stack>
          <Box p="8px" />

          <Stack fontSize="sm" color="gray.600">
            <Text>Shipping: {product.shippingInformation}</Text>
            <Text>Warranty: {product.warrantyInformation}</Text>
            <Text>Return Policy: {product.returnPolicy}</Text>
          </Stack>
          <Box p="8px" />
          <HStack>
            <Text>QR:</Text>
            <Image src={product.meta?.qrCode} alt="QR Code" boxSize="60px" />
          </HStack>
          <WeeklyBuyersChart />
        </VStack>
      </SimpleGrid>
    </Box>
  );
}
