// src/stores/productStore.ts
import { create } from "zustand";
import { Product } from "@/types/product";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "@/lib/FireBaseConfig";

interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  addProduct: (product: Omit<Product, "id">) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const snapshot = await getDocs(collection(db, "products"));
      const products = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];
      set({ products, isLoading: false });
    } catch (error) {
      set({
        error: "No se pudieron cargar los productos",
        isLoading: false,
      });
    }
  },

  addProduct: async (productData) => {
    set({ isLoading: true, error: null });
    try {
      // Generar ID basado en timestamp
      const id = Math.floor(Date.now() / 1000).toString();
  
      // Guardar en Firestore con ese ID
      await setDoc(doc(db, "products", id), {
        ...productData,
        id, // también lo guardamos dentro del documento
      });
  
      const newProduct: Product = { ...productData, id };
  
      // Actualizar estado local
      set({ products: [...get().products, newProduct], isLoading: false });
    } catch (error) {
      set({ error: "No se pudo agregar el producto", isLoading: false });
      console.error(error);
    }
  },

  updateProduct: async (id, productData) => {
    set({ isLoading: true, error: null });
    try {
      const ref = doc(db, "products", id);
      await updateDoc(ref, productData);
      const updated = get().products.map((p) =>
        p.id === id ? { ...p, ...productData } : p
      );
      set({ products: updated, isLoading: false });
    } catch (error) {
      set({ error: "No se pudo actualizar el producto", isLoading: false });
    }
  },

  deleteProduct: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await deleteDoc(doc(db, "products", id));
      const filtered = get().products.filter((p) => p.id !== id);
      set({ products: filtered, isLoading: false });
    } catch (error) {
      set({ error: "No se pudo eliminar el producto", isLoading: false });
    }
  },
}));
