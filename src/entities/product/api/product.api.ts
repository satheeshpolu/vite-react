import { httpClient } from '@/shared/lib/http';
import { Product, ProductsResponse } from '../model';

export const productApi = {
  getById: (id: number) => {
    return httpClient.get<Product>(`/products/${id}`);
  },

  getByCategory: (category: string) => {
    return httpClient.get<ProductsResponse>(`/products/category/${category}`);
  },

  getAll: (category: string) => {
    return httpClient.get<ProductsResponse>(`/products/category/${category}`);
  },

  search: (query: string) => {
    return httpClient.get<ProductsResponse>(`/products/search`, {
      params: { q: query },
    });
  },

  getCategories: () => {
    return httpClient.get<string[]>('/products/categories');
  },
};
