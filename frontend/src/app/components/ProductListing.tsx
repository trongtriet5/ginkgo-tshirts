"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PriceDisplay from './PriceDisplay';
import styles from './ProductListing.module.css';

interface Product {
  id: number;
  name: string;
  category: string;
  priceValue: number | null;
  sizes?: string[];
}

interface ProductListingProps {
  title: string;
  products: Product[];
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export default function ProductListing({ 
  title, 
  products: initialProducts,
  page = 1,
  totalPages = 1,
  onPageChange
}: ProductListingProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const products = initialProducts || [];

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.headerActions}>
          <span className={styles.productCount}>{products.length} Products (Page {page})</span>
          <button
            className={styles.mobileFilterButton}
            onClick={() => setIsFilterOpen(true)}
          >
            Filters
          </button>
        </div>
      </div>
      <div className={styles.container}>
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
        </aside>

        {isFilterOpen && <div className={styles.filterBackdrop} onClick={() => setIsFilterOpen(false)} />}

        <div className={styles.mainContent}>
          <main className={styles.grid}>
            {products.length === 0 ? (
              <p>Loading products...</p>
            ) : (
              products.map(product => (
                <Link
                  key={product.id}
                  href={`/clothing/${product.id}?name=${encodeURIComponent(product.name)}&priceValue=${product.priceValue ?? ''}&cat=${encodeURIComponent(product.category || '')}${product.sizes?.length ? `&sizes=${encodeURIComponent(product.sizes.join(','))}` : ''}`}
                  className={styles.productCard}
                >
                  <div className={styles.imageContainer}>
                    <Image
                      src={`/ginkgo${((product.id - 1) % 5) + 1}.jpg`}
                      alt=""
                      fill
                      className={styles.productImage}
                    />
                  </div>
                  <div className={styles.productInfo}>
                    <span className={styles.productName}>{product.name}</span>
                    <span className={styles.productCategory}>{product.category || 'Apparel'}</span>
                    <PriceDisplay vndAmount={product.priceValue} className={styles.productPrice} />
                  </div>
                </Link>
              ))
            )}
          </main>
          
          {totalPages > 1 && onPageChange && (
            <div className={styles.pagination}>
              <button 
                className={styles.pageButton} 
                disabled={page <= 1}
                onClick={() => onPageChange(page - 1)}
              >
                Previous
              </button>
              <span className={styles.pageInfo}>
                Page {page} of {totalPages}
              </span>
              <button 
                className={styles.pageButton} 
                disabled={page >= totalPages}
                onClick={() => onPageChange(page + 1)}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
