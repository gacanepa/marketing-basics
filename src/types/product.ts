export interface Product {
  id: string;
  nameKey?: 'ebike';
  name?: string;
  fixedCosts: number;
  variableCost: number;
  sellingPrice: number;
  marketSize: number;
  isBuiltin?: boolean;
}

export const EBIKE_PRODUCT: Product = {
  id: 'ebike',
  nameKey: 'ebike',
  fixedCosts: 500_000,
  variableCost: 800,
  sellingPrice: 1_500,
  marketSize: 1_000_000,
  isBuiltin: true,
};

export const CUSTOM_PRODUCTS_KEY = 'marketing-basics-custom-products';
export const ACTIVE_PRODUCT_KEY = 'marketing-basics-active-product';
