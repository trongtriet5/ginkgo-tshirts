"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './ProductListing.module.css';

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
}

interface ProductListingProps {
  title: string;
  products: Product[];
}

export default function ProductListing({ title, products: initialProducts }: ProductListingProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>(initialProducts || []);
  const [loading, setLoading] = useState(!initialProducts || initialProducts.length === 0);

  useEffect(() => {
    // Only fetch if no initial products were provided (so we can still use static fallback in some places)
    if (!initialProducts || initialProducts.length === 0) {
      const fetchProducts = async () => {
        try {
          const res = await fetch('http://localhost:3333/products');
          if (res.ok) {
            const data = await res.json();
            setProducts(data);
          }
        } catch (error) {
          console.error("Failed to fetch products:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchProducts();
    }
  }, [initialProducts]);
  
  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.headerActions}>
          <span className={styles.productCount}>{products.length} Products</span>
          <button 
            className={styles.mobileFilterButton} 
            onClick={() => setIsFilterOpen(true)}
          >
            Filters
          </button>
        </div>
      </div>

      <div className={styles.container}>
        {/* Sidebar Filter */}
        <aside className={`${styles.sidebar} ${isFilterOpen ? styles.sidebarOpen : ''}`}>
          <div className={styles.mobileFilterHeader}>
            <h2>Filters</h2>
            <button onClick={() => setIsFilterOpen(false)} className={styles.closeFilterBtn}>×</button>
          </div>
          <div className={styles.filterGroup}>
            <h3 className={styles.filterTitle}>Category</h3>
            <ul className={styles.filterList}>
              <li className={styles.filterItem}><input type="checkbox" /> Tops</li>
              <li className={styles.filterItem}><input type="checkbox" /> Bottoms</li>
              <li className={styles.filterItem}><input type="checkbox" /> Accessories</li>
            </ul>
          </div>
          <div className={styles.filterGroup}>
            <h3 className={styles.filterTitle}>Size</h3>
            <ul className={styles.filterList}>
              <li className={styles.filterItem}><input type="checkbox" /> S</li>
              <li className={styles.filterItem}><input type="checkbox" /> M</li>
              <li className={styles.filterItem}><input type="checkbox" /> L</li>
            </ul>
          </div>
          <div className={styles.filterGroup}>
            <h3 className={styles.filterTitle}>Color</h3>
            <ul className={styles.filterList}>
              <li className={styles.filterItem}><input type="checkbox" /> Black</li>
              <li className={styles.filterItem}><input type="checkbox" /> White</li>
              <li className={styles.filterItem}><input type="checkbox" /> Navy</li>
            </ul>
          </div>
          <div className={styles.mobileFilterFooter}>
            <button className={styles.applyFilterBtn} onClick={() => setIsFilterOpen(false)}>Apply Filters</button>
          </div>
        </aside>

        {isFilterOpen && <div className={styles.filterBackdrop} onClick={() => setIsFilterOpen(false)} />}

        {/* Product Grid */}
        <main className={styles.grid}>
          {loading ? (
            <p>Loading products from Oracle DB...</p>
          ) : (
            products.map(product => (
              <Link key={product.id} href={`/clothing/${product.id}`} passHref legacyBehavior>
                <a className={styles.productCard}>
                  <div className={styles.imageContainer}>
                    <div className={styles.primaryImage} style={{background: '#eaeaea'}} />
                    <div className={styles.secondaryImage} style={{background: '#dcdcdc'}} />
                    <button className={styles.quickAdd} onClick={(e) => e.preventDefault()}>Quick Add</button>
                  </div>
                  <div className={styles.productInfo}>
                    <span className={styles.productName}>{product.name}</span>
                    <span className={styles.productCategory}>{product.category || 'Apparel'}</span>
                    <span className={styles.productPrice}>{product.price ? `₫${product.price.toLocaleString()}` : 'Contact'}</span>
                  </div>
                </a>
              </Link>
            ))
          )}
        </main>
      </div>
    </>
  );
}
