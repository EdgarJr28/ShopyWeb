
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  features: string[];
  specifications: {
    [key: string]: string;
  };
  stock: number;
  rating: number;
}
