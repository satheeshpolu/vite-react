import { Product } from '@/entities/product';
import { useToaster } from '@/shared/hooks/useToaster';

export const useShareProduct = () => {
  const { showToast } = useToaster();

  const shareProduct = async (product: Product) => {
    const { id } = product;
    const baseUrl = window.location.origin;
    const currentPath = window.location.pathname;

    const isProductDetailsPage = currentPath.includes('product_details');
    const productUrl = isProductDetailsPage
      ? window.location.href
      : `${baseUrl}/category/${product.category}/${id}/product_details`;
    const shareData = {
      // TODO: Fix it
      // title: product.title,
      // text: `Check out ${product.title} - $${product.price}`,
      url: productUrl,
    };

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.url}`);
        showToast('Link copied!', 'Product link copied to clipboard', 'success');
      }
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        showToast('Share failed', 'Could not share the product', 'error');
      }
    }
  };

  return { shareProduct };
};
