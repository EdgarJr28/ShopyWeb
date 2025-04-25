
import { create } from 'zustand';
import { CartItem } from '@/contexts/CartContext';

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
      // In a real app, this would be an API call
      // For now, we'll use the local data
      set({ orders: [], isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch orders', isLoading: false });
    }
  },
  
  addOrder: async (orderData) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, this would be an API call
      const newOrder: Order = {
        ...orderData,
        id: Math.random().toString(36).substring(2, 9),
        createdAt: new Date().toISOString(),
      };
      
      const updatedOrders = [...get().orders, newOrder];
      set({ orders: updatedOrders, isLoading: false });
      return newOrder;
    } catch (error) {
      set({ error: 'Failed to add order', isLoading: false });
      throw error;
    }
  },
  
  updateOrderStatus: async (id, status) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, this would be an API call
      const updatedOrders = get().orders.map(order => 
        order.id === id ? { ...order, status } : order
      );
      set({ orders: updatedOrders, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to update order status', isLoading: false });
    }
  },
}));
