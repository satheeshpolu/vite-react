import { useWishlistStore } from './wishlist.store';
import { Product } from '@/entities/product';

const mockProduct: Product = {
  id: 1,
  title: 'Product A',
  description: 'Description A',
  price: 50,
  discountPercentage: 5,
  rating: 4.5,
  stock: 100,
  category: 'electronics',
  availabilityStatus: 'In Stock',
  minimumOrderQuantity: 1,
  shippingInformation: 'Ships in 2 days',
  returnPolicy: '30-day return',
  warrantyInformation: '1 year',
  weight: 0.5,
  sku: 'ABC123',
  tags: ['tech'],
  thumbnail: 'thumb.jpg',
  dimensions: { width: 10, height: 5, depth: 2 },
  meta: { createdAt: '2024-01-01', updatedAt: '2024-01-10', barcode: '123', qrCode: 'qr' },
  reviews: [],
};

const mockProduct2: Product = { ...mockProduct, id: 2, title: 'Product B' };

beforeEach(() => {
  useWishlistStore.setState({ items: [] });
});

describe('addToWishlist', () => {
  it('adds a product to the wishlist', () => {
    useWishlistStore.getState().addToWishlist(mockProduct);
    expect(useWishlistStore.getState().items).toHaveLength(1);
  });

  it('sets isFavorite to true when adding', () => {
    useWishlistStore.getState().addToWishlist(mockProduct);
    expect(useWishlistStore.getState().items[0].isFavorite).toBe(true);
  });

  it('does not add a duplicate product', () => {
    useWishlistStore.getState().addToWishlist(mockProduct);
    useWishlistStore.getState().addToWishlist(mockProduct);
    expect(useWishlistStore.getState().items).toHaveLength(1);
  });

  it('adds multiple distinct products', () => {
    useWishlistStore.getState().addToWishlist(mockProduct);
    useWishlistStore.getState().addToWishlist(mockProduct2);
    expect(useWishlistStore.getState().items).toHaveLength(2);
  });
});

describe('removeFromWishlist', () => {
  it('removes a product by id', () => {
    useWishlistStore.getState().addToWishlist(mockProduct);
    useWishlistStore.getState().removeFromWishlist(mockProduct.id);
    expect(useWishlistStore.getState().items).toHaveLength(0);
  });

  it('does not affect other products when removing', () => {
    useWishlistStore.getState().addToWishlist(mockProduct);
    useWishlistStore.getState().addToWishlist(mockProduct2);
    useWishlistStore.getState().removeFromWishlist(mockProduct.id);
    const items = useWishlistStore.getState().items;
    expect(items).toHaveLength(1);
    expect(items[0].id).toBe(mockProduct2.id);
  });

  it('does nothing when product id does not exist', () => {
    useWishlistStore.getState().addToWishlist(mockProduct);
    useWishlistStore.getState().removeFromWishlist(999);
    expect(useWishlistStore.getState().items).toHaveLength(1);
  });
});

describe('isInWishlist', () => {
  it('returns true for a product in the wishlist', () => {
    useWishlistStore.getState().addToWishlist(mockProduct);
    expect(useWishlistStore.getState().isInWishlist(mockProduct.id)).toBe(true);
  });

  it('returns false for a product not in the wishlist', () => {
    expect(useWishlistStore.getState().isInWishlist(mockProduct.id)).toBe(false);
  });

  it('returns false after product is removed', () => {
    useWishlistStore.getState().addToWishlist(mockProduct);
    useWishlistStore.getState().removeFromWishlist(mockProduct.id);
    expect(useWishlistStore.getState().isInWishlist(mockProduct.id)).toBe(false);
  });
});

describe('toggleWishlist', () => {
  it('adds a product when it is not in the wishlist', () => {
    useWishlistStore.getState().toggleWishlist(mockProduct);
    expect(useWishlistStore.getState().isInWishlist(mockProduct.id)).toBe(true);
  });

  it('removes a product when it is already in the wishlist', () => {
    useWishlistStore.getState().addToWishlist(mockProduct);
    useWishlistStore.getState().toggleWishlist(mockProduct);
    expect(useWishlistStore.getState().isInWishlist(mockProduct.id)).toBe(false);
  });

  it('re-adds a product after toggling twice', () => {
    useWishlistStore.getState().toggleWishlist(mockProduct);
    useWishlistStore.getState().toggleWishlist(mockProduct);
    useWishlistStore.getState().toggleWishlist(mockProduct);
    expect(useWishlistStore.getState().isInWishlist(mockProduct.id)).toBe(true);
  });
});
