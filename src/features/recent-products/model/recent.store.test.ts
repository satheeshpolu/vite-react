import { useRecentProductsStore } from './recent.store';
import { Product } from '@/entities/product';

const makeProduct = (id: number): Product => ({
  id,
  title: `Product ${id}`,
  description: 'desc',
  price: 10 * id,
  discountPercentage: 0,
  rating: 4,
  stock: 10,
  category: 'general',
  availabilityStatus: 'In Stock',
  minimumOrderQuantity: 1,
  shippingInformation: 'Ships in 3 days',
  returnPolicy: '30-day return',
  warrantyInformation: '1 year',
  weight: 1,
  sku: `SKU-${id}`,
  tags: [],
  thumbnail: `thumb${id}.jpg`,
  dimensions: { width: 1, height: 1, depth: 1 },
  meta: { createdAt: '2024-01-01', updatedAt: '2024-01-01', barcode: `${id}`, qrCode: `qr${id}` },
  reviews: [],
});

beforeEach(() => {
  useRecentProductsStore.setState({ items: [] });
});

describe('addToRecent', () => {
  it('adds a product to the recent list', () => {
    useRecentProductsStore.getState().addToRecent(makeProduct(1));
    expect(useRecentProductsStore.getState().items).toHaveLength(1);
  });

  it('adds new product to the front of the list', () => {
    useRecentProductsStore.getState().addToRecent(makeProduct(1));
    useRecentProductsStore.getState().addToRecent(makeProduct(2));
    const items = useRecentProductsStore.getState().items;
    expect(items[0].id).toBe(2);
    expect(items[1].id).toBe(1);
  });

  it('moves an existing product to the front when re-added', () => {
    useRecentProductsStore.getState().addToRecent(makeProduct(1));
    useRecentProductsStore.getState().addToRecent(makeProduct(2));
    useRecentProductsStore.getState().addToRecent(makeProduct(1));
    const items = useRecentProductsStore.getState().items;
    expect(items[0].id).toBe(1);
    expect(items).toHaveLength(2);
  });

  it('does not create duplicates', () => {
    useRecentProductsStore.getState().addToRecent(makeProduct(1));
    useRecentProductsStore.getState().addToRecent(makeProduct(1));
    useRecentProductsStore.getState().addToRecent(makeProduct(1));
    expect(useRecentProductsStore.getState().items).toHaveLength(1);
  });

  it('enforces a maximum of 20 items', () => {
    for (let i = 1; i <= 25; i++) {
      useRecentProductsStore.getState().addToRecent(makeProduct(i));
    }
    expect(useRecentProductsStore.getState().items).toHaveLength(20);
  });

  it('keeps the most recent items when limit is exceeded', () => {
    for (let i = 1; i <= 25; i++) {
      useRecentProductsStore.getState().addToRecent(makeProduct(i));
    }
    const items = useRecentProductsStore.getState().items;
    expect(items[0].id).toBe(25);
    expect(items[19].id).toBe(6);
  });
});

describe('clearRecent', () => {
  it('removes all recent products', () => {
    useRecentProductsStore.getState().addToRecent(makeProduct(1));
    useRecentProductsStore.getState().addToRecent(makeProduct(2));
    useRecentProductsStore.getState().clearRecent();
    expect(useRecentProductsStore.getState().items).toHaveLength(0);
  });

  it('does nothing when list is already empty', () => {
    useRecentProductsStore.getState().clearRecent();
    expect(useRecentProductsStore.getState().items).toHaveLength(0);
  });
});
