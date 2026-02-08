import { Product } from '@/entities/product';
import { toaster } from '@/components/ui/toaster';

export const useShareProduct = () => {
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
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(`${shareData.url}`);
        toaster.create({
          title: 'Link copied!',
          description: 'Product link copied to clipboard',
          type: 'success',
        });
      }
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        // toaster.create({
        //   title: 'Share failed',
        //   description: 'Could not share the product',
        //   type: 'error',
        // });
      }
    }
  };

  return { shareProduct };
};
