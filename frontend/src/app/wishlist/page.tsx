import styles from './page.module.css';
import Link from 'next/link';

export default function WishlistPage() {
  const wishlistItems = []; // Empty for now to show empty state

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Wishlist</h1>
      <p className={styles.subtitle}>{wishlistItems.length} items saved</p>

      {wishlistItems.length > 0 ? (
        <div className={styles.grid}>
          {/* Reuse product card styles here when items exist */}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p>Your wishlist is currently empty.</p>
          <Link href="/clothing">
            <button>Discover New Arrivals</button>
          </Link>
        </div>
      )}
    </div>
  );
}
