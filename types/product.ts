export interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  featured: boolean;
  image: string;
  created_at?: string;
}