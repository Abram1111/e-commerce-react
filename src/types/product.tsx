export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  description: string;
  category: string;
  discountPercentage: number;
  rating: number;
  stock: number;
  // add any extra fields the API returns (brand, images, etc.)
}
