import { Box, Grid, Image, Text, Heading, VStack, Stack, Flex, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingSkeleton from '../components/LoadingSkeleton';
import useProductStore from '@/stores/useProductStore';
import { useRecentStore } from '@/stores/useRecentStore';
import { BackButton } from '@/components/shared';
import { t } from 'i18next';
import { EmptyState } from '@/components/shared/empty/EmptyState';
import { Product } from '@/utils/types';

export default function RecentProducts() {
  const { category } = useParams();
  const navigate = useNavigate();

  const borderColor = 'gray.700';
  const [loading, setLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const { items } = useRecentStore();

  const { fetchProducts, toggleFavorite, favoriteProducts } = useProductStore();

  useEffect(() => {
    setLoading(false);
    fetchProducts(category as string);
    if (items?.length === 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [fetchProducts, category, items]);

  return (
    <Box p={6}>
      <Flex justify="flex-end" mt={4} mr={4} gap={8}>
        <BackButton />
      </Flex>

      <Heading size="lg" mb={6}>
        {favoriteProducts ? t('recentlyViewed.title') : `Category: ${category}`}
      </Heading>
      {isEmpty && <EmptyState type={'recentlyViewed'} />}

      {isEmpty && (
        <Flex justify="center" align="center" minH="60vh">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRightRadius={{ md: '80px' }}
            px={4}
            py={8}
            bg="#8ef1e4"
          >
            <VStack textAlign="center">
              <Heading fontSize={{ base: '3xl', md: '4xl' }}>
                You haven’t viewed any products recently
              </Heading>
              <Text fontSize={{ base: 'md', md: 'lg' }} maxW="md">
                Browse the home page to explore products
              </Text>
            </VStack>
          </Box>
        </Flex>
      )}
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
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

        {items?.map((product: Product) => (
          <Box
            key={product?.id}
            borderRadius="lg"
            overflow="hidden"
            bg="#8ef1e4"
            borderColor={borderColor}
            shadow="md"
            _hover={{ transform: 'scale(1.02)', transition: '0.2s' }}
          >
            <Box
              onClick={() => {
                toggleFavorite(product.id, 'favorite');
              }}
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              w="100%"
              p={4}
              cursor={'pointer'}
            >
              {/* {product.isFavorite ? (
                <FaHeart size={30} color="rgba(202, 39, 39, 1)" />
              ) : (
                <FaRegHeart size={30} color="rgba(32, 134, 125, 1)" />
              )} */}
              <Stack direction="row" align="center" justify="space-between" w="full">
                <Text fontWeight="bold">${product.price}</Text>
                <Button
                  type="submit"
                  alignSelf="flex-start"
                  variant="outline"
                  bg="#0f695f"
                  color="#c9f9f4"
                  onClick={() => {
                    navigate(`/category/${category}/${product.id}/product_details`, {
                      state: { data: product },
                    });
                  }}
                >
                  Details
                </Button>
              </Stack>
            </Box>
            <Image
              src={product?.thumbnail}
              alt={product?.title}
              objectFit="scale-down"
              w="100%"
              h="120px"
              _hover={{
                transform: 'scale(1.5)',
                transition: '0.5s',
                zIndex: -1,
              }}
            />

            <Box p={4}>
              <VStack>
                <Heading fontSize="lg" zIndex={1}>
                  {product.title}
                </Heading>
              </VStack>
            </Box>
          </Box>
        ))}
      </Grid>
    </Box>
  );
}
