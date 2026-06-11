"use client";

import { useEffect, useState } from 'react';
import ProductListing from '../components/ProductListing';

interface BackendProduct {
  id: string;
  name: string;
  code: string;
  color: string;
  price: number | null;
  category: string;
  sizes: string[];
}

export default function ClothingPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3333/products?page=${page}&limit=20`);
        if (response.ok) {
          const result = await response.json();
          const data: BackendProduct[] = result.data;
          setTotalPages(result.meta.totalPages);
          
          // Map backend format to ProductListing component format
          const formattedProducts = data.map(p => ({
            id: parseInt(p.id, 10) || Math.floor(Math.random() * 100000),
            name: p.name,
            category: p.color ? `Color: ${p.color}` : 'Clothing',
            priceValue: p.price,
            sizes: p.sizes || []
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
    };

    fetchProducts();
  }, [page]);

  if (loading && products.length === 0) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h2>Loading products...</h2>
      </div>
    );
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ProductListing 
      title="Clothing" 
      products={products} 
      page={page}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
}
