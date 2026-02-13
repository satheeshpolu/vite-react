import { useCartStore } from '@/entities/cart';
import { Product } from '@/entities/product';
import { useToaster } from '@/shared/hooks';

export const useAddToCart = () => {
  const { addItem, items } = useCartStore();
  const { showToast } = useToaster();
  const addToCart = (product: Product) => {
    const isAlreadyInCart = items.some((item) => item.id === product.id);

    if (isAlreadyInCart) {
      showToast('Already in cart', `${product.title} quantity increased`, 'warning');
    } else {
      showToast('Added to cart', `${product.title} has been added`, 'success');
    }

    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      discountPercentage: product.discountPercentage,
    });
  };

  return { addToCart };
};
