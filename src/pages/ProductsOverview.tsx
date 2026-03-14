import { Box, Grid, Heading, Flex } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';

import { formatText } from '@/utils/helpers';
import SortDropdown from '@/components/SortDropdown';
import { BackButton } from '@/components/shared';
import { Product } from '@/utils/types';
import ProductCard from '@/components/ProductCard';
import { sortProducts, useProducts } from '@/entities/product';

export default function ProductsOverview() {
  const { category } = useParams();

  const { data: products } = useProducts(category ?? '');

  const [sortedProducts, setSortedProducts] = useState<Product[] | undefined>(undefined);

  const onFilter = useCallback(
    (value: string) => {
      setSortedProducts(
        sortProducts(products?.products ?? [], value as 'price' | 'title' | 'rating')
      );
    },
    [products]
  );

  return (
    <Box p={6}>
      <Flex justify="flex-end" mt={4} mr={4} gap={8}>
        <SortDropdown onFilterChange={onFilter} />
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
        {(sortedProducts ?? products?.products ?? []).map((product: Product) => (
          <ProductCard product={product} key={product?.id} />
        ))}
      </Grid>
    </Box>
  );
}
