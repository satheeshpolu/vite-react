import { Box, Grid, Heading, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useProductStore from '@/stores/useProductStore';
import { useRecentStore } from '@/stores/useRecentStore';
import { BackButton } from '@/shared/ui/back-button';
import { t } from 'i18next';
import { EmptyState } from '@/shared/ui/empty-state';
import { Product } from '@/utils/types';
import { ProductCard } from '@/widgets/product-card';

export default function RecentProducts() {
  const { category } = useParams();

  const [isEmpty, setIsEmpty] = useState(true);
  const { items } = useRecentStore();

  const { fetchProducts, favoriteProducts } = useProductStore();

  useEffect(() => {
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

      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        }}
        gap={6}
      >
        {items?.map((product: Product) => (
          <ProductCard key={product?.id} product={product} />
        ))}
      </Grid>
    </Box>
  );
}
