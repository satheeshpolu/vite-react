import { useCartStore } from './cart.store';

const mockItem = {
  id: 1,
  title: 'Test Product',
  price: 100,
  thumbnail: 'thumb.jpg',
};

const mockItemWithDiscount = {
  id: 2,
  title: 'Discounted Product',
  price: 200,
  thumbnail: 'thumb2.jpg',
  discountPercentage: 10,
};

beforeEach(() => {
  useCartStore.setState({ items: [] });
});

describe('addItem', () => {
  it('adds a new item with quantity 1', () => {
    useCartStore.getState().addItem(mockItem);
    const items = useCartStore.getState().items;
    expect(items).toHaveLength(1);
    expect(items[0]).toMatchObject({ ...mockItem, quantity: 1 });
  });

  it('increments quantity when adding an existing item', () => {
    useCartStore.getState().addItem(mockItem);
    useCartStore.getState().addItem(mockItem);
    const items = useCartStore.getState().items;
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(2);
  });

  it('adds multiple distinct items', () => {
    useCartStore.getState().addItem(mockItem);
    useCartStore.getState().addItem(mockItemWithDiscount);
    expect(useCartStore.getState().items).toHaveLength(2);
  });
});

describe('removeItem', () => {
  it('removes an item by id', () => {
    useCartStore.getState().addItem(mockItem);
    useCartStore.getState().removeItem(mockItem.id);
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it('does not affect other items when removing', () => {
    useCartStore.getState().addItem(mockItem);
    useCartStore.getState().addItem(mockItemWithDiscount);
    useCartStore.getState().removeItem(mockItem.id);
    const items = useCartStore.getState().items;
    expect(items).toHaveLength(1);
    expect(items[0].id).toBe(mockItemWithDiscount.id);
  });

  it('does nothing when item id does not exist', () => {
    useCartStore.getState().addItem(mockItem);
    useCartStore.getState().removeItem(999);
    expect(useCartStore.getState().items).toHaveLength(1);
  });
});

describe('updateQuantity', () => {
  it('updates the quantity of an existing item', () => {
    useCartStore.getState().addItem(mockItem);
    useCartStore.getState().updateQuantity(mockItem.id, 5);
    expect(useCartStore.getState().items[0].quantity).toBe(5);
  });

  it('removes the item when quantity is set to 0', () => {
    useCartStore.getState().addItem(mockItem);
    useCartStore.getState().updateQuantity(mockItem.id, 0);
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it('removes the item when quantity is negative', () => {
    useCartStore.getState().addItem(mockItem);
    useCartStore.getState().updateQuantity(mockItem.id, -1);
    expect(useCartStore.getState().items).toHaveLength(0);
  });
});

describe('clearCart', () => {
  it('removes all items from the cart', () => {
    useCartStore.getState().addItem(mockItem);
    useCartStore.getState().addItem(mockItemWithDiscount);
    useCartStore.getState().clearCart();
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it('does nothing when cart is already empty', () => {
    useCartStore.getState().clearCart();
    expect(useCartStore.getState().items).toHaveLength(0);
  });
});

describe('getTotal', () => {
  it('returns 0 for an empty cart', () => {
    expect(useCartStore.getState().getTotal()).toBe(0);
  });

  it('calculates total for items without discount', () => {
    useCartStore.getState().addItem(mockItem); // price: 100, qty: 1
    useCartStore.getState().addItem(mockItem); // qty becomes 2
    expect(useCartStore.getState().getTotal()).toBe(200);
  });

  it('applies discount percentage to the price', () => {
    useCartStore.getState().addItem(mockItemWithDiscount); // price: 200, 10% off = 180
    expect(useCartStore.getState().getTotal()).toBeCloseTo(180);
  });

  it('sums totals across multiple items', () => {
    useCartStore.getState().addItem(mockItem); // 100 * 1 = 100
    useCartStore.getState().addItem(mockItemWithDiscount); // 200 * 0.9 * 1 = 180
    expect(useCartStore.getState().getTotal()).toBeCloseTo(280);
  });
});

describe('getItemCount', () => {
  it('returns 0 for an empty cart', () => {
    expect(useCartStore.getState().getItemCount()).toBe(0);
  });

  it('returns total quantity across all items', () => {
    useCartStore.getState().addItem(mockItem);
    useCartStore.getState().addItem(mockItem); // qty: 2
    useCartStore.getState().addItem(mockItemWithDiscount); // qty: 1
    expect(useCartStore.getState().getItemCount()).toBe(3);
  });

  it('returns correct count after quantity update', () => {
    useCartStore.getState().addItem(mockItem);
    useCartStore.getState().updateQuantity(mockItem.id, 10);
    expect(useCartStore.getState().getItemCount()).toBe(10);
  });
});
