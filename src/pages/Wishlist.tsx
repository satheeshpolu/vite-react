import { Box, Grid, Heading, Flex } from '@chakra-ui/react';
import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import useProductStore from '@/stores/useProductStore';
import { BackButton } from '@/components/shared';
import { useTranslation } from 'react-i18next';
import { EmptyState } from '@/components/shared/empty/EmptyState';
import { Product } from '@/utils/types';
import ProductCard from '@/components/ProductCard';

export default function Wishlist() {
  const { category } = useParams();
  const [isEmpty, setIsEmpty] = useState(true);
  const { t } = useTranslation();
  const { fetchProducts, favoriteProducts } = useProductStore();

  const loadProducts = useCallback(() => {
    fetchProducts(category as string);
  }, [fetchProducts, category]);

  useEffect(() => {
    loadProducts();
    if (favoriteProducts.length === 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [loadProducts, favoriteProducts]);

  return (
    <Box p={6}>
      <Flex justify="flex-end" mt={4} mr={4} gap={8}>
        <BackButton />
      </Flex>

      <Heading size="lg" mb={6}>
        {favoriteProducts ? t('wishlist.title') : `Category: {category}`}
      </Heading>

      {isEmpty && <EmptyState type={'wishlist'} />}
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        }}
        gap={6}
      >
        {favoriteProducts.map((product: Product) => (
          <ProductCard key={product?.id} product={product} />
        ))}
      </Grid>
    </Box>
  );
}
