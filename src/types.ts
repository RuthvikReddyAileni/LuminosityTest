export type Category =
  | 'Ancient Rome'
  | 'Prehistoric'
  | 'Victorian Era'
  | 'Middle Ages'
  | '20th Century';

export interface Product {
  id: string;           // Firestore doc id
  name: string;
  description: string;
  price: number;        // stored as number in USD
  stock: number;        // available inventory
  category: Category;
  imageUrl: string;     // relative URL under public
}

export interface CartLine {
  productId: string;
  qty: number;          // 0..stock
}