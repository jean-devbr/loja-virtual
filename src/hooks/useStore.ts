import { useState, useEffect } from 'react';
import { Product, CartItem, Store } from '../types';

const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Smartphone Pro Max',
    price: 1299.99,
    description: 'Latest smartphone with advanced features and premium design',
    image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Electronics',
    stock: 15
  },
  {
    id: '2',
    name: 'Wireless Headphones',
    price: 299.99,
    description: 'Premium noise-cancelling wireless headphones',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Electronics',
    stock: 25
  },
  {
    id: '3',
    name: 'Designer Backpack',
    price: 89.99,
    description: 'Stylish and functional backpack for daily use',
    image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Fashion',
    stock: 12
  },
  {
    id: '4',
    name: 'Smart Watch',
    price: 399.99,
    description: 'Advanced smartwatch with health monitoring features',
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Electronics',
    stock: 8
  },
  {
    id: '5',
    name: 'Coffee Maker',
    price: 149.99,
    description: 'Professional-grade coffee maker for perfect brewing',
    image: 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Home',
    stock: 20
  },
  {
    id: '6',
    name: 'Yoga Mat',
    price: 34.99,
    description: 'High-quality yoga mat for comfortable practice',
    image: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Sports',
    stock: 30
  }
];

export const useStore = () => {
  const [store, setStore] = useState<Store>(() => {
    const saved = localStorage.getItem('ecommerce-store');
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        products: parsed.products || initialProducts,
        cart: parsed.cart || [],
        currentView: 'home' as const
      };
    }
    return {
      products: initialProducts,
      cart: [],
      currentView: 'home' as const
    };
  });

  useEffect(() => {
    localStorage.setItem('ecommerce-store', JSON.stringify({
      products: store.products,
      cart: store.cart
    }));
  }, [store.products, store.cart]);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString()
    };
    setStore(prev => ({
      ...prev,
      products: [...prev.products, newProduct]
    }));
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setStore(prev => ({
      ...prev,
      products: prev.products.map(p => 
        p.id === id ? { ...p, ...updates } : p
      )
    }));
  };

  const deleteProduct = (id: string) => {
    setStore(prev => ({
      ...prev,
      products: prev.products.filter(p => p.id !== id),
      cart: prev.cart.filter(item => item.id !== id)
    }));
  };

  const addToCart = (product: Product) => {
    setStore(prev => {
      const existingItem = prev.cart.find(item => item.id === product.id);
      if (existingItem) {
        return {
          ...prev,
          cart: prev.cart.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...prev,
        cart: [...prev.cart, { ...product, quantity: 1 }]
      };
    });
  };

  const removeFromCart = (id: string) => {
    setStore(prev => ({
      ...prev,
      cart: prev.cart.filter(item => item.id !== id)
    }));
  };

  const updateCartQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setStore(prev => ({
      ...prev,
      cart: prev.cart.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    }));
  };

  const setCurrentView = (view: Store['currentView']) => {
    setStore(prev => ({ ...prev, currentView: view }));
  };

  const getCartTotal = () => {
    return store.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return store.cart.reduce((count, item) => count + item.quantity, 0);
  };

  return {
    ...store,
    addProduct,
    updateProduct,
    deleteProduct,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    setCurrentView,
    getCartTotal,
    getCartItemCount
  };
};