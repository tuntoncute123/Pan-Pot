import { createContext, useContext, useMemo, useState } from "react";

const CART_STORAGE_KEY = "pan_pot_cart";

const CartContext = createContext(null);

function readInitialCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((item) => item && item.id && Number(item.quantity) > 0);
  } catch {
    return [];
  }
}

function toVnd(value) {
  return Number(value || 0).toLocaleString("vi-VN") + " ₫";
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readInitialCart);

  function persist(nextItems) {
    setItems(nextItems);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(nextItems));
  }

  function addToCart(product, quantity = 1) {
    const amount = Math.max(1, Number(quantity) || 1);
    const id = String(product.id || product.slug || product.name || Date.now());

    const normalized = {
      id,
      name: product.name || "Sản phẩm",
      image: product.image || product.images?.[0] || "https://via.placeholder.com/140x140?text=Product",
      price: Number(product.salePrice || product.price || 0),
      priceText: product.salePriceText || product.priceText || toVnd(product.salePrice || product.price || 0),
      category: product.category || "Khác",
      quantity: amount,
    };

    const existingIndex = items.findIndex((item) => item.id === id);
    if (existingIndex >= 0) {
      const nextItems = items.map((item, index) =>
        index === existingIndex ? { ...item, quantity: item.quantity + amount } : item
      );
      persist(nextItems);
      return;
    }

    persist([...items, normalized]);
  }

  function updateQuantity(id, quantity) {
    const nextQuantity = Number(quantity) || 0;
    if (nextQuantity <= 0) {
      removeFromCart(id);
      return;
    }

    const nextItems = items.map((item) => (item.id === id ? { ...item, quantity: nextQuantity } : item));
    persist(nextItems);
  }

  function removeFromCart(id) {
    const nextItems = items.filter((item) => item.id !== id);
    persist(nextItems);
  }

  function clearCart() {
    persist([]);
  }

  const cartCount = useMemo(() => items.reduce((sum, item) => sum + Number(item.quantity || 0), 0), [items]);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0), 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      cartCount,
      subtotal,
      subtotalText: toVnd(subtotal),
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
    }),
    [items, cartCount, subtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}
