import { Product } from '@/utils/types';
import { Text } from '@chakra-ui/react';
import { Box, Image, Heading, VStack } from '@chakra-ui/react';
import { ProductCardFooter } from './shared/product/ProductCardFooter';
import { ProductCardHeader } from './shared/product/ProductCardHeader';

const cardStyles = {
  borderRadius: 'lg',
  overflow: 'hidden',
  bg: '#8ef1e4',
  shadow: 'md',
  borderColor: 'gray.700',
  _hover: {
    transform: 'scale(1.02)',
    transition: '0.2s',
    borderColor: 'rgb(32, 134, 125)',
    borderWidth: '1px',
  },
};

type ProductCardProps = {
  product: Product;
};
const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Box {...cardStyles}>
      <ProductCardHeader product={product} />
      <Image
        src={product?.thumbnail}
        alt={product?.title}
        objectFit="scale-down"
        w="100%"
        h="200px"
        _hover={{
          transform: 'scale(1.3)',
          transition: '0.5s',
          zIndex: -1,
        }}
      />
      <Box p={4}>
        <VStack>
          <Heading fontSize="lg" whiteSpace="nowrap" overflow="hidden">
            {product.title}
          </Heading>

          <Box height={150}>
            <Text fontSize="sm" color="gray.600">
              {product.description}
            </Text>
          </Box>

          <ProductCardFooter product={product} />
        </VStack>
      </Box>
    </Box>
  );
};

export default ProductCard;
