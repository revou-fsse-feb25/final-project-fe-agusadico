import { httpGet } from '@/lib/http';
import { ProductType } from '@/types/product';

export type ProductListResponse = ProductType[];

export async function listProducts(params?: { search?: string; category?: string; sort?: string }) {
  const query = new URLSearchParams();
  if (params?.search) query.set('search', params.search);
  if (params?.category) query.set('category', params.category);
  if (params?.sort) query.set('sort', params.sort);
  const path = query.toString() ? `/products?${query.toString()}` : '/products';
  return httpGet<ProductListResponse>(path);
}

export async function getProduct(idOrSlug: string | number) {
  return httpGet<ProductType>(`/products/${idOrSlug}`);
}

// Alias that matches the requested API: products.list()
export const list = (params?: { search?: string; category?: string; sort?: string }) =>
  listProducts(params);

// Get single product by ID or slug
export const get = async (idOrSlug: string | number) => {
  try {
    // First try to fetch directly by ID/slug
    return await httpGet<ProductType>(`/products/${idOrSlug}`);
  } catch (error: any) {
    // If direct fetch fails, fallback to fetching all and finding locally
    if (error.status === 404) {
      const allProducts = await listProducts();
      const found = allProducts.find(p => 
        p.id === Number(idOrSlug) || 
        p.slug === idOrSlug ||
        p.name.toLowerCase().includes(String(idOrSlug).toLowerCase())
      );
      if (found) return found;
    }
    throw error;
  }
};


