'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ProductType } from '../types/product';
import { notifySuccess, notifyError, notifyInfo } from '@/lib/notifications';

type CartItem = {
  product: ProductType;
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: ProductType, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: ProductType, quantity: number) => {
    try {
      setCartItems(prevItems => {
        const existingItem = prevItems.find(item => item.product.id === product.id);
        
        if (existingItem) {
          // Update quantity if item already exists
          notifySuccess(`Updated quantity of ${product.name} in your cart`);
          return prevItems.map(item => 
            item.product.id === product.id 
              ? { ...item, quantity: item.quantity + quantity } 
              : item
          );
        } else {
          // Add new item
          notifySuccess(`${product.name} added to your cart`);
          return [...prevItems, { product, quantity }];
        }
      });
    } catch (error) {
      notifyError('Failed to add item to cart');
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = (productId: number) => {
    try {
      // Find the product name before removing
      const itemToRemove = cartItems.find(item => item.product.id === productId);
      setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
      
      if (itemToRemove) {
        notifyInfo(`${itemToRemove.product.name} removed from your cart`);
      }
    } catch (error) {
      notifyError('Failed to remove item from cart');
      console.error('Error removing from cart:', error);
    }
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    //return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    return cartItems.reduce((total, item) => {
      // Check if item.product and item.product.price exist before using them
      if (item && item.product && typeof item.product.price === 'number') {
        return total + (item.product.price * item.quantity);
      }
      return total;
    }, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}