// Firestore access layer (keeps components thin & testable).
import { collection, getDocs, addDoc, query, limit } from 'firebase/firestore';
import { db } from '@/firebase';
import type { Product } from '@/types';
import { seedProducts } from '@/data/seed';

const PRODUCTS = 'products';

export async function seedIfEmpty(): Promise<void> {
  // Quick existence check: if there is at least 1 document, we assume seeded.
  const q = query(collection(db, PRODUCTS), limit(1));
  const snap = await getDocs(q);
  if (!snap.empty) return;

  // Seed initial products so reviewers don’t need to run scripts.
  for (const p of seedProducts) {
    await addDoc(collection(db, PRODUCTS), p);
  }
}

export async function fetchProducts(): Promise<Product[]> {
  const snap = await getDocs(collection(db, PRODUCTS));
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Product, 'id'>) }));
}