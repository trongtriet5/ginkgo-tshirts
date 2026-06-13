"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PriceDisplay from './PriceDisplay';
import SkeletonCard from './SkeletonCard';
import styles from './ProductListing.module.css';

interface Product {
  id: number;
  name: string;
  category: string;
  typeGroup?: string;
  priceValue: number | null;
  sizes?: string[];
}

export interface FilterOptions {
  sizes: string[];
  colors: string[];
  categoryGroups: string[];
}

export interface FilterState {
  sizes: string[];
  colors: string[];
  categoryGroups: string[];
}

interface ProductListingProps {
  title: string;
  products: Product[];
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  loading?: boolean;
  filterOptions?: FilterOptions;
  filterState?: FilterState;
  onFilterChange?: (filters: FilterState) => void;
}

const COLOR_NAMES: Record<string, string> = {
  BLK: 'Black', WHI: 'White', NAV: 'Navy', GRE: 'Grey', RED: 'Red',
  BLU: 'Blue', GRN: 'Green', YEL: 'Yellow', ORA: 'Orange', PPA: 'Purple',
  BOR: 'Bordeaux', OLI: 'Olive', CRE: 'Cream', JBG: 'Beige', GPE: 'Green',
  BDE: 'Burgundy', CAM: 'Cambodge', AGD: 'Army Green', VIO: 'Violet',
  RPM: 'Raspberry', EMR: 'Emerald', BJL: 'Bridal', NI: 'Navy Indigo',
  BWH: 'Black White', COB: 'Cobalt', YEO: 'Yellow Orange', MNT: 'Mint',
  MIX: 'Mix', ARM: 'Army', ATT: 'Attitude', FSK: 'Fossil', HDF: 'Hardface',
};

function toggleListItem(list: string[], item: string): string[] {
  return list.includes(item)
    ? list.filter((x) => x !== item)
    : [...list, item];
}

export default function ProductListing({ 
  title, 
  products: initialProducts,
  page = 1,
  totalPages = 1,
  onPageChange,
  loading,
  filterOptions,
  filterState,
  onFilterChange,
}: ProductListingProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const products = initialProducts || [];
  const options = filterOptions || { sizes: [], colors: [], categoryGroups: [] };
  const filters = filterState || { sizes: [], colors: [], categoryGroups: [] };

  const handleToggle = (group: keyof FilterState, value: string) => {
    if (!onFilterChange) return;
    const next = { ...filters, [group]: toggleListItem(filters[group], value) };
    onFilterChange(next);
  };

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
          {options.categoryGroups.length > 0 && (
            <div className={styles.filterGroup}>
              <h3 className={styles.filterTitle}>Category</h3>
              <ul className={styles.filterList}>
                {options.categoryGroups.map((g) => (
                  <li key={g} className={styles.filterItem}>
                    <label>
                      <input
                        type="checkbox"
                        checked={filters.categoryGroups.includes(g)}
                        onChange={() => handleToggle('categoryGroups', g)}
                      />
                      {' '}{g}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {options.sizes.length > 0 && (
            <div className={styles.filterGroup}>
              <h3 className={styles.filterTitle}>Size</h3>
              <ul className={styles.filterList}>
                {options.sizes.map((s, i) => (
                  <li key={s ?? `size-${i}`} className={styles.filterItem}>
                    <label>
                      <input
                        type="checkbox"
                        checked={filters.sizes.includes(s)}
                        onChange={() => handleToggle('sizes', s)}
                      />
                      {' '}{s}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {options.colors.length > 0 && (
            <div className={styles.filterGroup}>
              <h3 className={styles.filterTitle}>Color</h3>
              <ul className={styles.filterList}>
                  {options.colors.map((c, i) => (
                  <li key={c ?? `color-${i}`} className={styles.filterItem}>
                    <label>
                      <input
                        type="checkbox"
                        checked={filters.colors.includes(c)}
                        onChange={() => handleToggle('colors', c)}
                      />
                      {' '}{COLOR_NAMES[c] || c}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>

        {isFilterOpen && <div className={styles.filterBackdrop} onClick={() => setIsFilterOpen(false)} />}

        <div className={styles.mainContent}>
          <main className={styles.grid}>
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            ) : products.length === 0 ? (
              <p>No products found.</p>
            ) : (
              products.map(product => (
                <Link
                  key={product.id}
                  href={`/clothing/${product.id}?name=${encodeURIComponent(product.name)}&priceValue=${product.priceValue ?? ''}&cat=${encodeURIComponent(product.category || '')}${product.sizes?.length ? `&sizes=${encodeURIComponent(product.sizes.join(','))}` : ''}`}
                  className={styles.productCard}
                >
                  <div className={styles.imageContainer}>
                    <Image
                      src={`/ginkgo${((product.id - 1) % 4) + 1}.jpg`}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
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
