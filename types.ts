
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  discountPrice?: number;
  stock: number;
  sku: string;
  shortDescription: string;
  fullDescription: string;
  specifications: { [key: string]: string };
  images: string[];
  status: 'In Stock' | 'Out of Stock';
  popularity: number;
}

export interface User {
  id: number;
  email: string;
  password?: string; // Should not be stored in frontend state in a real app
  role: 'user' | 'admin';
  name: string;
}

export interface Order {
  id: string;
  userId: number;
  date: string;
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered';
  customer: {
    name: string;
    email: string;
  };
  items: CartItem[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}
