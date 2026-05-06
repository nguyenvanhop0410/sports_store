import { createContext, useContext, useMemo, useState } from 'react';

const CartContext = createContext(null);
const CART_KEY = 'sporthub_cart';

const getCartItemId = (productId, size, color) => `${productId}::${size || 'default'}::${color || 'default'}`;

const normalizeStoredItems = (items) =>
  Array.isArray(items)
    ? items.map((item) => ({
        ...item,
        size: item.size || '',
        color: item.color || '',
        cartItemId: item.cartItemId || getCartItemId(item.productId, item.size, item.color),
      }))
    : [];

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? normalizeStoredItems(JSON.parse(raw)) : [];
  });

  const persistItems = (nextItems) => {
    const normalizedItems = normalizeStoredItems(nextItems);
    setItems(normalizedItems);
    localStorage.setItem(CART_KEY, JSON.stringify(normalizedItems));
  };

  const addToCart = (product, quantity = 1, size = '', color = '') => {
    const nextQuantity = Number(quantity);
    if (nextQuantity <= 0) return;

    const cartItemId = getCartItemId(product._id, size, color);
    const existing = items.find((item) => item.cartItemId === cartItemId);

    if (existing) {
      const merged = items.map((item) => {
        if (item.cartItemId !== cartItemId) {
          return item;
        }

        return {
          ...item,
          quantity: Math.min(item.quantity + nextQuantity, product.stock),
        };
      });
      persistItems(merged);
      return;
    }

    persistItems([
      ...items,
      {
        cartItemId,
        productId: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        stock: product.stock,
        quantity: Math.min(nextQuantity, product.stock),
        size,
        color,
      },
    ]);
  };

  const updateQuantity = (cartItemId, quantity) => {
    const target = items.find(
      (item) => item.cartItemId === cartItemId || item.productId === cartItemId
    );
    if (!target) return;

    const fixedQuantity = Math.max(1, Math.min(Number(quantity), target.stock || 999));
    const merged = items.map((item) =>
      item.cartItemId === target.cartItemId ? { ...item, quantity: fixedQuantity } : item
    );

    persistItems(merged);
  };

  const removeItem = (cartItemId) => {
    persistItems(
      items.filter((item) => item.cartItemId !== cartItemId && item.productId !== cartItemId)
    );
  };

  const clearCart = () => {
    persistItems([]);
  };

  const totals = useMemo(() => {
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return { totalQuantity, totalAmount };
  }, [items]);

  const value = useMemo(
    () => ({ items, ...totals, addToCart, updateQuantity, removeItem, clearCart }),
    [items, totals]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }

  return context;
};
