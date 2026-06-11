import type { Metadata } from 'next';
import styles from './page.module.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Wishlist | Ginkgo T-Shirts',
  description: 'Your saved items.',
};

export default function WishlistPage() {
  const wishlistItems: never[] = [];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Wishlist</h1>
      <p className={styles.subtitle}>{wishlistItems.length} items saved</p>

      {wishlistItems.length > 0 ? (
        <div className={styles.grid}>
          {/* Product cards when items exist */}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p>Your wishlist is currently empty.</p>
          <Link href="/clothing" className={styles.discoverButton}>
            Discover New Arrivals
          </Link>
        </div>
      )}
    </div>
  );
}
