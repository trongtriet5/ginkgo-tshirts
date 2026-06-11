"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MdSearch, MdFavoriteBorder } from 'react-icons/md';
import { useCurrency, type CurrencyCode } from '../context/CurrencyContext';
import styles from './Navbar.module.css';
import CartDrawer from './CartDrawer';
import SearchOverlay from './SearchOverlay';

const CURRENCIES: { code: CurrencyCode; label: string }[] = [
  { code: 'VND', label: 'VND' },
  { code: 'USD', label: 'USD' },
  { code: 'EUR', label: 'EUR' },
];

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { currency, setCurrency, loading } = useCurrency();

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navLinks}>
          <div className={styles.navItem}>
            <Link href="/clothing" className={styles.navLink}>Clothing</Link>
            <div className={styles.dropdown}>
              <Link href="/clothing?category=t-shirts" className={styles.dropdownLink}>T-Shirts</Link>
              <Link href="/clothing?category=polos" className={styles.dropdownLink}>Polo Shirts</Link>
              <Link href="/clothing?category=sweaters" className={styles.dropdownLink}>Sweaters</Link>
              <Link href="/clothing?category=pants" className={styles.dropdownLink}>Pants</Link>
              <Link href="/clothing?category=shirts" className={styles.dropdownLink}>Shirts</Link>
            </div>
          </div>

          <div className={styles.navItem}>
            <Link href="/accessories" className={styles.navLink}>Accessories</Link>
            <div className={styles.dropdown}>
              <Link href="/accessories?category=bags" className={styles.dropdownLink}>Bags</Link>
              <Link href="/accessories?category=belts" className={styles.dropdownLink}>Belts</Link>
              <Link href="/accessories?category=scarves" className={styles.dropdownLink}>Scarves</Link>
              <Link href="/accessories?category=hats" className={styles.dropdownLink}>Hats</Link>
            </div>
          </div>

        </div>

        <div className={styles.logo}>
          <Link href="/">
            <Image 
              src="/logo_ginkgo.png" 
              alt="Ginkgo Logo" 
              width={180} 
              height={50} 
              className={styles.logoImage}
              priority
            />
          </Link>
        </div>

        <div className={styles.actions}>
          <div className={styles.searchWrapper}>
            <button 
              className={styles.iconButton} 
              aria-label="Search"
              onClick={() => setIsSearchOpen(true)}
            >
              <MdSearch size={26} />
            </button>
            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
          </div>
          <div className={styles.currencyGroup}>
            {CURRENCIES.map((c) => (
              <button
                key={c.code}
                className={`${styles.currencyBtn} ${currency === c.code ? styles.currencyActive : ''}`}
                onClick={() => setCurrency(c.code)}
                disabled={loading}
              >
                {c.label}
              </button>
            ))}
          </div>
          <Link href="/wishlist" className={styles.iconButton} aria-label="Wishlist">
            <MdFavoriteBorder size={26} />
          </Link>
          <button
            className={`${styles.iconButton} ${styles.cartButton}`}
            aria-label="Cart"
            onClick={() => setIsCartOpen(true)}
          >
            <Image src="/cintre.png" alt="" width={26} height={26} />
            <span className={styles.cartCount}>0</span>
          </button>
        </div>
      </nav>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
