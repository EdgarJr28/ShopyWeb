// src/stores/orderStore.ts
import { create } from 'zustand';
import { CartItem } from '@/contexts/CartContext';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/FireBaseConfig';

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
  address?: string;
  phone?: string;
}

interface OrderState {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
  fetchOrders: () => Promise<void>;
  addOrder: (orderData: Omit<Order, 'id' | 'createdAt'>) => Promise<Order>;
  updateOrderStatus: (id: string, status: Order['status']) => Promise<void>;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: [],
  isLoading: false,
  error: null,

  fetchOrders: async () => {
    set({ isLoading: true, error: null });
    try {
      const snapshot = await getDocs(collection(db, 'orders'));
      const orders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate().toISOString(),
      })) as Order[];
      set({ orders, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch orders', isLoading: false });
    }
  },

  addOrder: async (orderData) => {
    set({ isLoading: true, error: null });
    try {
      const docRef = await addDoc(collection(db, 'orders'), {
        ...orderData,
        createdAt: Timestamp.now(),
      });

      const newOrder: Order = {
        ...orderData,
        id: docRef.id,
        createdAt: new Date().toISOString(),
      };

      set((state) => ({
        orders: [...state.orders, newOrder],
        isLoading: false,
      }));

      return newOrder;
    } catch (error) {
      set({ error: 'Failed to add order', isLoading: false });
      throw error;
    }
  },

  updateOrderStatus: async (id, status) => {
    set({ isLoading: true, error: null });
    try {
      const ref = doc(db, 'orders', id);
      await updateDoc(ref, { status });

      set((state) => ({
        orders: state.orders.map((order) =>
          order.id === id ? { ...order, status } : order
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to update order status', isLoading: false });
    }
  },
}));
