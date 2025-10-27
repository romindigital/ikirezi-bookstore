import { createContext, useContext, useReducer, useEffect } from 'react';

export const CartContext = createContext();

const initialState = {
  items: [],
  total: 0,
  itemCount: 0
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      };

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(0, action.payload.quantity) }
            : item
        ).filter(item => item.quantity > 0)
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        total: 0,
        itemCount: 0
      };

    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload.items || [],
        total: action.payload.total || 0,
        itemCount: action.payload.itemCount || 0
      };

    case 'CALCULATE_TOTALS':
      const itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
      const total = state.items.reduce((total, item) => {
        const price = item.discountPrice || item.price;
        return total + (price * item.quantity);
      }, 0);
      return {
        ...state,
        itemCount,
        total: parseFloat(total.toFixed(2))
      };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    // Load cart from localStorage on mount
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: cartData });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    dispatch({ type: 'CALCULATE_TOTALS' });
  }, [state.items]);

  useEffect(() => {
    // Save cart to localStorage after totals are calculated
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  const addToCart = (book) => {
    dispatch({ type: 'ADD_ITEM', payload: book });
  };

  const removeFromCart = (bookId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: bookId });
  };

  const updateQuantity = (bookId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: bookId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const isInCart = (bookId) => {
    return state.items.some(item => item.id === bookId);
  };

  const getItemQuantity = (bookId) => {
    const item = state.items.find(item => item.id === bookId);
    return item ? item.quantity : 0;
  };

  const value = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity
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
