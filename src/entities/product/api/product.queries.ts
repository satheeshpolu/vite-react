// React Query hooks for product data

import { useQuery } from '@tanstack/react-query';
import { productApi } from './product.api';
import { APP_CONSTANTS } from '@/app/config';

export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...productKeys.lists(), filters] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: number) => [...productKeys.details(), id] as const,
  categories: () => [...productKeys.all, 'categories'] as const,
};

export const useProduct = (id: number) => {
  const query = useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => productApi.getById(id),
    staleTime: APP_CONSTANTS.STALE_TIME,
    gcTime: APP_CONSTANTS.GC_TIME,
    enabled: !!id,
  });

  // Log the response
  // console.log('useProduct response:', query.data);

  return query.data ? query : { ...query, data: undefined };
};

export const useProductsByCategory = (category: string) => {
  return useQuery({
    queryKey: productKeys.list({ category }),
    queryFn: () => productApi.getByCategory(category),
    staleTime: APP_CONSTANTS.STALE_TIME,
    enabled: !!category,
  });
};

export const useProducts = (category: string) => {
  return useQuery({
    queryKey: productKeys.list({ category }),
    queryFn: () => productApi.getAll(category),
    staleTime: APP_CONSTANTS.STALE_TIME,
  });
};

export const useProductSearch = (query: string) => {
  return useQuery({
    queryKey: productKeys.list({ search: query }),
    queryFn: () => productApi.search(query),
    staleTime: APP_CONSTANTS.STALE_TIME,
    enabled: query.length >= 2,
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: productKeys.categories(),
    queryFn: () => productApi.getCategories(),
    staleTime: APP_CONSTANTS.GC_TIME, // Categories change rarely
  });
};
