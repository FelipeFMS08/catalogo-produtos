import type { Product } from "../types/product";

export class ProductService {
  BASE_URL: string;

  constructor() {
    this.BASE_URL = process.env.NEXT_PUBLIC_FAKE_API_URL || "localhost:8080"; 
  }

  async getProducs(): Promise<Product[]> {
    try {
      const response = await fetch(`${this.BASE_URL}/products`);
      if (!response.ok) throw new Error('Falha ao carregar produtos');

      return response.json();
    } catch(error) {
      console.log(error);
      return [];
    }
  }
}