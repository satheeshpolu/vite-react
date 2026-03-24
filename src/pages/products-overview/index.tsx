import { Box, Grid, Heading, Flex } from '@chakra-ui/react';
import { useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import useProductStore from '@/stores/useProductStore';

import { formatText } from '@/utils/helpers';
import { SortDropdown } from '@/shared/ui/sort-dropdown';
import { BackButton } from '@/shared/ui/back-button';
import { Product } from '@/utils/types';
import { ProductCard } from '@/widgets/product-card';

export default function ProductsOverview() {
  const { category } = useParams();

  const { products, fetchProducts, sortProducts } = useProductStore();

  const loadProducts = useCallback(() => {
    fetchProducts(category as string);
  }, [fetchProducts, category]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <Box p={6}>
      <Flex justify="flex-end" mt={4} mr={4} gap={8}>
        <SortDropdown
          onFilterChange={(value) => {
            sortProducts(value);
          }}
        />
        <BackButton />
      </Flex>

      <Heading size="lg" mb={6}>
        Category: {formatText(category as string)}
      </Heading>

      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        }}
        gap={6}
      >
        {products?.map((product: Product) => (
          <ProductCard product={product} key={product?.id} />
        ))}
      </Grid>
    </Box>
  );
}
