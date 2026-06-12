"use client";

import { useEffect, useState, useCallback } from 'react';
import ProductListing from '../components/ProductListing';
import type { FilterOptions, FilterState } from '../components/ProductListing';

interface BackendProduct {
  id: string;
  name: string;
  code: string;
  color: string;
  price: number | null;
  category: string;
  typeDetail: string;
  typeGroup: string;
  sizes: string[];
}

function buildQueryString(params: Record<string, string | number | undefined>): string {
  const parts: string[] = [];
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '' && value !== null) {
      parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
    }
  }
  return parts.join('&');
}

export default function AccessoriesPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({ sizes: [], colors: [], categoryGroups: [] });
  const [filters, setFilters] = useState<FilterState>({ sizes: [], colors: [], categoryGroups: [] });

  // Build filter query (always includes Accessories)
  const filterQuery = useCallback(() => {
    const params: Record<string, string | number | undefined> = {
      categoryGroup: 'Accessories',
      productGroup: 'Accessories',
    };
    if (filters.sizes.length > 0) params.size = filters.sizes.join(',');
    if (filters.colors.length > 0) params.color = filters.colors.join(',');
    return params;
  }, [filters]);

  // Fetch filter options with current filters so sizes/colors are relevant
  const fetchFilterOptions = useCallback(async () => {
    try {
      const params = filterQuery();
      const qs = buildQueryString(params);
      const url = `http://localhost:3333/products/meta/filters${qs ? '?' + qs : ''}`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setFilterOptions(data);
      }
    } catch {}
  }, [filterQuery]);

  useEffect(() => {
    fetchFilterOptions();
  }, [fetchFilterOptions]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string | number | undefined> = {
        page,
        limit: 20,
        categoryGroup: 'Accessories',
        productGroup: 'Accessories',
      };
      if (filters.sizes.length > 0) params.size = filters.sizes.join(',');
      if (filters.colors.length > 0) params.color = filters.colors.join(',');

      const response = await fetch(`http://localhost:3333/products?${buildQueryString(params)}`);
      if (response.ok) {
        const result = await response.json();
        const data: BackendProduct[] = result.data;
        setTotalPages(result.meta.totalPages);

        const formattedProducts = data.map((p) => ({
          id: parseInt(p.id, 10) || Math.floor(Math.random() * 100000),
          name: p.name,
          category: p.category || 'Accessories',
          typeGroup: p.typeGroup,
          priceValue: p.price,
          sizes: p.sizes || [],
        }));
        setProducts(formattedProducts);
      } else {
        console.error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, [page, filters]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterChange = (next: FilterState) => {
    setFilters(next);
    setPage(1);
  };

  return (
    <ProductListing 
      title="Accessories" 
      products={products} 
      page={page}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      loading={loading}
      filterOptions={filterOptions}
      filterState={filters}
      onFilterChange={handleFilterChange}
    />
  );
}
