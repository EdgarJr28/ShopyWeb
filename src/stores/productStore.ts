
import { create } from 'zustand';
import { Product } from '@/types/product';
import { products as initialProducts } from '@/data/products';

interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: initialProducts,
  isLoading: false,
  error: null,
  
  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, this would be an API call
      // For now, we'll use the local data
      set({ products: initialProducts, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch products', isLoading: false });
    }
  },
  
  addProduct: async (productData) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, this would be an API call
      const newProduct = {
        ...productData,
        id: Math.random().toString(36).substring(2, 9),
      } as Product;
      
      const updatedProducts = [...get().products, newProduct];
      set({ products: updatedProducts, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to add product', isLoading: false });
    }
  },
  
  updateProduct: async (id, productData) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, this would be an API call
      const updatedProducts = get().products.map(product => 
        product.id === id ? { ...product, ...productData } : product
      );
      set({ products: updatedProducts, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to update product', isLoading: false });
    }
  },
  
  deleteProduct: async (id) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, this would be an API call
      const filteredProducts = get().products.filter(product => product.id !== id);
      set({ products: filteredProducts, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to delete product', isLoading: false });
    }
  },
}));
