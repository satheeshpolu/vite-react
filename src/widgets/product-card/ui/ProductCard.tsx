import { Box, Image, Heading, VStack, Text, HStack, Button } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { Product, getDiscountedPrice, getFormattedPrice } from '@/entities/product';
import { useShareProduct } from '@/features/share-product';
import { useWishlistStore } from '@/features/wishlist';
import { useAddToCart } from '@/features/add-to-cart';
import { useRecentProductsStore } from '@/features/recent-products';
import { FaHeart, FaRegHeart, FaShare, FaCartPlus, FaCircleInfo } from 'react-icons/fa6';

interface ProductCardProps {
  product: Product;
  renderActions?: (product: Product) => React.ReactNode;
  renderFooter?: (product: Product) => React.ReactNode;
  onClick?: () => void;
}

function DefaultActions({ product }: { product: Product }) {
  const { shareProduct } = useShareProduct();
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const isFavorite = isInWishlist(product.id);

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" w="100%" p={4}>
      <FaShare
        size={20}
        color="rgba(32, 134, 125, 1)"
        onClick={(e) => { e.stopPropagation(); shareProduct(product); }}
        cursor="pointer"
      />
      <Box onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }} cursor="pointer">
        {isFavorite
          ? <FaHeart size={24} color="rgba(202, 39, 39, 1)" />
          : <FaRegHeart size={24} color="rgba(32, 134, 125, 1)" />}
      </Box>
    </Box>
  );
}

function DefaultFooter({ product }: { product: Product }) {
  const navigate = useNavigate();
  const { category } = useParams();
  const { addToCart } = useAddToCart();
  const { addToRecent } = useRecentProductsStore();
  const discountedPrice = getDiscountedPrice(product);

  return (
    <HStack gap={4} w="full" mt="auto" justify="space-between">
      <Box>
        <Text fontWeight="bold" color="teal.600" fontSize="sm">
          {getFormattedPrice(discountedPrice)}
        </Text>
        {product.discountPercentage > 0 && (
          <Text fontSize="xs" textDecoration="line-through" color="gray.400">
            {getFormattedPrice(product.price)}
          </Text>
        )}
      </Box>
      <HStack gap={2}>
        <Button
          size="sm"
          variant="outline"
          bg="#0f695f"
          color="#c9f9f4"
          onClick={(e) => {
            e.stopPropagation();
            addToRecent(product);
            navigate(`/category/${category ?? product.category}/${product.id}/product_details`, {
              state: { data: product },
            });
          }}
        >
          <FaCircleInfo />
        </Button>
        <Button
          size="sm"
          colorScheme="teal"
          variant="outline"
          onClick={(e) => { e.stopPropagation(); addToCart(product); }}
        >
          <FaCartPlus />
        </Button>
      </HStack>
    </HStack>
  );
}

export function ProductCard({ product, renderActions, renderFooter, onClick }: ProductCardProps) {
  return (
    <Box
      borderRadius="lg"
      overflow="hidden"
      bg="white"
      shadow="sm"
      borderWidth="1px"
      borderColor="gray.100"
      _hover={{ shadow: 'md', borderColor: 'teal.200', transform: 'scale(1.02)', transition: '0.2s' }}
      cursor={onClick ? 'pointer' : 'default'}
      onClick={onClick}
    >
      {renderActions ? renderActions(product) : <DefaultActions product={product} />}

      <Image
        src={product.thumbnail}
        alt={product.title}
        objectFit="scale-down"
        w="100%"
        h="200px"
        _hover={{ transform: 'scale(1.05)', transition: '0.3s' }}
      />

      <Box p={4}>
        <VStack align="stretch" gap={2}>
          <Heading fontSize="md" lineClamp={1}>
            {product.title}
          </Heading>
          <Text fontSize="sm" color="gray.500" lineClamp={2}>
            {product.description}
          </Text>
          {renderFooter ? renderFooter(product) : <DefaultFooter product={product} />}
        </VStack>
      </Box>
    </Box>
  );
}
