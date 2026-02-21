
import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { Product, Order } from '../types';
import { mockProducts, mockOrders } from '../data/mockData';

interface DataContextType {
  products: Product[];
  orders: Order[];
  addProduct: (product: Omit<Product, 'id' | 'popularity'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getProductById: (id: string) => Product | undefined;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const getProductById = useCallback((id: string) => {
    return products.find(p => p.id === id);
  }, [products]);

  const addProduct = (productData: Omit<Product, 'id' | 'popularity'>) => {
    const newProduct: Product = {
      ...productData,
      id: (products.length + 1).toString(),
      popularity: Math.floor(Math.random() * 30) + 70, // Assign random popularity
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  return (
    <DataContext.Provider value={{ products, orders, addProduct, updateProduct, deleteProduct, updateOrderStatus, getProductById }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
