"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Overlays.module.css';

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US').format(price);
}

function productImage(id: string): string {
  return `/ginkgo${((parseInt(id, 10) - 1) % 5) + 1}.jpg`;
}

interface SearchResult {
  id: string;
  name: string;
  code: string;
  color: string;
  price: number | null;
  category: string;
  sizes: string[];
}

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    if (!isOpen) {
      setQuery('');
      setResults([]);
      setSearched(false);
      setError('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleSearch = async () => {
    const q = query.trim();
    if (!q) return;

    setLoading(true);
    setSearched(true);
    setError('');
    try {
      const res = await fetch(`http://localhost:3333/products?page=1&limit=20&search=${encodeURIComponent(q)}`);
      if (res.ok) {
        const data = await res.json();
        const seen = new Map<string, SearchResult>();
        for (const item of (data.data || []) as SearchResult[]) {
          if (!seen.has(item.name)) {
            seen.set(item.name, item);
          }
        }
        setResults(Array.from(seen.values()));
      } else {
        setError(`Server error: ${res.status}`);
        setResults([]);
      }
    } catch (e) {
      setError('Cannot connect to server. Is the backend running?');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.searchDropdown} ref={dropdownRef}>
      <div className={styles.searchDropdownHeader}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for products, categories..."
          className={styles.searchDropdownInput}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className={styles.searchDropdownResults}>
        {loading && <p className={styles.searchDropdownHint}>Searching...</p>}
        {!loading && error && (
          <p className={styles.searchDropdownError}>{error}</p>
        )}
        {!loading && !error && searched && results.length === 0 && (
          <p className={styles.searchDropdownHint}>No products found.</p>
        )}
        {!loading && !error && !searched && (
          <p className={styles.searchDropdownHint}>Press Enter to search</p>
        )}
        {!loading && results.length > 0 && (
          <ul className={styles.searchResultList}>
            {results.map((product) => (
              <li key={product.id}>
                <Link
                  href={`/clothing/${product.id}`}
                  className={styles.searchResultItem}
                  onClick={onClose}
                >
                  <div className={styles.searchResultImage}>
                    <Image src={productImage(product.id)} alt="" fill />
                  </div>
                  <span className={styles.searchResultName}>{product.name}</span>
                  {product.price !== null && (
                    <span className={styles.searchResultPrice}>
                      {formatPrice(product.price)} VND
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
