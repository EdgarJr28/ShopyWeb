
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product } from '@/types/product';

// Define the structure of our cart state
interface CartState {
  items: CartItem[];
  total: number;
}

// Define the structure of a cart item
export interface CartItem {
  product: Product;
  quantity: number;
}

// Define the actions we can perform on our cart
type CartAction = 
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

// Define the context type
interface CartContextType {
  state: CartState;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Initial state for the cart
const initialState: CartState = {
  items: [],
  total: 0
};

// Create the reducer function
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        item => item.product.id === action.payload.id
      );

      let newItems;

      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        newItems = [...state.items];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + 1
        };
      } else {
        // Item does not exist, add new item
        newItems = [...state.items, { product: action.payload, quantity: 1 }];
      }

      // Calculate new total
      const newTotal = newItems.reduce(
        (sum, item) => sum + (item.product.price * item.quantity),
        0
      );

      return {
        ...state,
        items: newItems,
        total: newTotal
      };
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.product.id !== action.payload);
      
      // Calculate new total
      const newTotal = newItems.reduce(
        (sum, item) => sum + (item.product.price * item.quantity),
        0
      );

      return {
        ...state,
        items: newItems,
        total: newTotal
      };
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      
      // If quantity is 0, remove the item
      if (quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: id });
      }

      const newItems = state.items.map(item => 
        item.product.id === id 
          ? { ...item, quantity }
          : item
      );

      // Calculate new total
      const newTotal = newItems.reduce(
        (sum, item) => sum + (item.product.price * item.quantity),
        0
      );

      return {
        ...state,
        items: newItems,
        total: newTotal
      };
    }

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
}

// Create the provider component
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Define the actions
  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{ state, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

// Create a hook to use the cart context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
