import { useCallback, useState } from 'react';
import {
  ACTIVE_PRODUCT_KEY,
  CUSTOM_PRODUCTS_KEY,
  EBIKE_PRODUCT,
  type Product,
} from '../types/product';

const readCustomProducts = (): Product[] => {
  try {
    const raw = localStorage.getItem(CUSTOM_PRODUCTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Product[];
    return Array.isArray(parsed) ? parsed.filter((p) => p && typeof p.id === 'string') : [];
  } catch {
    return [];
  }
};

const readActiveId = (): string => {
  try {
    return localStorage.getItem(ACTIVE_PRODUCT_KEY) || EBIKE_PRODUCT.id;
  } catch {
    return EBIKE_PRODUCT.id;
  }
};

export const useProducts = () => {
  const [customProducts, setCustomProducts] = useState<Product[]>(readCustomProducts);
  const [activeId, setActiveId] = useState<string>(readActiveId);

  const allProducts: Product[] = [EBIKE_PRODUCT, ...customProducts];

  const activeProduct = allProducts.find((p) => p.id === activeId) ?? EBIKE_PRODUCT;

  const persistCustom = (next: Product[]) => {
    setCustomProducts(next);
    try {
      localStorage.setItem(CUSTOM_PRODUCTS_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  const selectProduct = useCallback((id: string) => {
    setActiveId(id);
    try {
      localStorage.setItem(ACTIVE_PRODUCT_KEY, id);
    } catch {
      /* ignore */
    }
  }, []);

  const createProduct = useCallback(
    (product: Omit<Product, 'id' | 'isBuiltin' | 'nameKey'>) => {
      const created: Product = {
        ...product,
        id: `custom-${Date.now()}`,
        isBuiltin: false,
      };
      persistCustom([...customProducts, created]);
      selectProduct(created.id);
      return created;
    },
    [customProducts, selectProduct],
  );

  const deleteProduct = useCallback(
    (id: string) => {
      if (id === EBIKE_PRODUCT.id) return;
      const next = customProducts.filter((p) => p.id !== id);
      persistCustom(next);
      if (activeId === id) selectProduct(EBIKE_PRODUCT.id);
    },
    [customProducts, activeId, selectProduct],
  );

  return {
    allProducts,
    customProducts,
    activeProduct,
    activeId,
    selectProduct,
    createProduct,
    deleteProduct,
  };
};
