import { SearchBox } from '@/shared/ui/search-box';
import { formatText } from '@/utils/helpers';
import { Box, Grid, Text, Icon, Flex, VStack } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { FaBoxOpen } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const categories = [
  'beauty',
  'fragrances',
  'furniture',
  'groceries',
  'home-decoration',
  'kitchen-accessories',
  'laptops',
  'mens-shirts',
  'mens-shoes',
  'mens-watches',
  'mobile-accessories',
  'motorcycle',
  'skin-care',
  'smartphones',
  'sports-accessories',
  'sunglasses',
  'tablets',
  'tops',
  'vehicle',
  'womens-bags',
  'womens-dresses',
  'womens-jewellery',
  'womens-shoes',
  'womens-watches',
];

export default function CategoryGrid() {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const categoriesList = useMemo(() => {
    const query = searchInput.trim().toLowerCase();
    return categories.filter((category) => category.toLowerCase().includes(query));
  }, [searchInput]);

  return (
    <VStack gap={6} align="stretch" p={6}>
      {/* Row 1: Search box */}
      <Box>
        <SearchBox value={searchInput} onChange={setSearchInput} placeholder="Search category" />
      </Box>

      {/* Row 2: Categories grid */}
      <Grid
        templateColumns={{
          base: 'repeat(2, 1fr)',
          sm: 'repeat(3, 1fr)',
          md: 'repeat(4, 1fr)',
          lg: 'repeat(6, 1fr)',
        }}
        gap={6}
      >
        {!categoriesList.length ? (
          <Text fontSize="lg" color="gray.500" gridColumn="1 / -1" textAlign="center">
            No categories found. Try a different search.
          </Text>
        ) : (
          categoriesList.map((category) => (
            <Box
              key={category}
              bg="gray.100"
              borderRadius="lg"
              boxShadow="md"
              p={4}
              textAlign="center"
              transition="all 0.2s"
              _hover={{
                transform: 'scale(1.05)',
                cursor: 'pointer',
                bg: 'teal.200',
                color: 'teal.500',
              }}
              onClick={() => navigate(`/category/${category}`)}
            >
              <Flex justify="center" mb={2}>
                <Icon as={FaBoxOpen} w={6} h={6} color="teal.400" />
              </Flex>
              <Text fontWeight="semibold" fontSize="sm" color="gray.600">
                {formatText(category)}
              </Text>
            </Box>
          ))
        )}
      </Grid>
    </VStack>
  );
}
