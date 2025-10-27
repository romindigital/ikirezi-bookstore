import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';

export const CartContext = createContext();

const initialState = {
  items: [],
  total: 0,
  itemCount: 0
};

// Helper function to calculate totals from items
const calculateTotals = (items) => {
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const total = items.reduce((total, item) => {
    const price = item.discountPrice || item.price;
    return total + (price * item.quantity);
  }, 0);
  
  return {
    itemCount,
    total: parseFloat(total.toFixed(2))
  };
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { payload: book, quantity = 1 } = action;
      const existingItem = state.items.find(item => item.id === book.id);
      
      let newItems;
      if (existingItem) {
        // Check stock limit (assuming book has stock property)
        const newQuantity = existingItem.quantity + quantity;
        const maxQuantity = book.stock || 99; // Default to 99 if no stock limit
        const finalQuantity = Math.min(newQuantity, maxQuantity);
        
        newItems = state.items.map(item =>
          item.id === book.id
            ? { ...item, quantity: finalQuantity }
            : item
        );
      } else {
        newItems = [...state.items, { ...book, quantity: Math.min(quantity, book.stock || 99) }];
      }
      
      const totals = calculateTotals(newItems);
      return {
        ...state,
        items: newItems,
        ...totals
      };
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      const totals = calculateTotals(newItems);
      return {
        ...state,
        items: newItems,
        ...totals
      };
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity < 1) return state; // Guard against invalid quantities
      
      const book = state.items.find(item => item.id === id);
      const maxQuantity = book?.stock || 99;
      const finalQuantity = Math.min(quantity, maxQuantity);
      
      const newItems = state.items.map(item =>
        item.id === id
          ? { ...item, quantity: finalQuantity }
          : item
      ).filter(item => item.quantity > 0); // Remove items with 0 quantity
      
      const totals = calculateTotals(newItems);
      return {
        ...state,
        items: newItems,
        ...totals
      };
    }

    case 'CLEAR_CART':
      return {
        items: [],
        total: 0,
        itemCount: 0
      };

    case 'LOAD_CART': {
      // Only load items from localStorage, recalc totals fresh
      const items = action.payload.items || [];
      const totals = calculateTotals(items);
      return {
        items,
        ...totals
      };
    }

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: cartData });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        // Clear corrupted data
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // Save only items to localStorage when they change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify({ items: state.items }));
  }, [state.items]);

  const addToCart = useCallback((book, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: book, quantity });
  }, []);

  const removeFromCart = useCallback((bookId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: bookId });
  }, []);

  const updateQuantity = useCallback((bookId, quantity) => {
    if (quantity < 1) return; // Guard against invalid quantities
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: bookId, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const isInCart = useCallback((bookId) => {
    return state.items.some(item => item.id === bookId);
  }, [state.items]);

  const getItemQuantity = useCallback((bookId) => {
    const item = state.items.find(item => item.id === bookId);
    return item ? item.quantity : 0;
  }, [state.items]);

  const getCartTotal = useCallback(() => {
    return calculateTotals(state.items);
  }, [state.items]);

  const value = {
    items: state.items,
    total: state.total,
    itemCount: state.itemCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
    getCartTotal
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}