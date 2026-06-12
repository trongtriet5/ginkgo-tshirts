import Link from 'next/link';
import styles from './page.module.css';

export default function SitemapPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sitemap</h1>

      <div className={styles.section}>
        <h2 className={styles.heading}>Clothing</h2>
        <Link href="/clothing" className={styles.link}>All Clothing</Link>
        <Link href="/clothing?category=t-shirts" className={styles.link}>T-Shirts</Link>
        <Link href="/clothing?category=polos" className={styles.link}>Polo Shirts</Link>
        <Link href="/clothing?category=sweaters" className={styles.link}>Sweaters</Link>
        <Link href="/clothing?category=pants" className={styles.link}>Pants</Link>
        <Link href="/clothing?category=shirts" className={styles.link}>Shirts</Link>
      </div>

      <div className={styles.section}>
        <h2 className={styles.heading}>Accessories</h2>
        <Link href="/accessories" className={styles.link}>All Accessories</Link>
        <Link href="/accessories?category=bags" className={styles.link}>Bags</Link>
        <Link href="/accessories?category=belts" className={styles.link}>Belts</Link>
        <Link href="/accessories?category=scarves" className={styles.link}>Scarves</Link>
        <Link href="/accessories?category=hats" className={styles.link}>Hats</Link>
      </div>

      <div className={styles.section}>
        <h2 className={styles.heading}>The World of Ginkgo</h2>
        <Link href="/the-world-of-ginkgo/story" className={styles.link}>Story</Link>
        <Link href="/the-world-of-ginkgo/stores" className={styles.link}>Stores</Link>
        <Link href="/the-world-of-ginkgo/creations" className={styles.link}>Creations</Link>
      </div>

      <div className={styles.section}>
        <h2 className={styles.heading}>Help</h2>
        <Link href="/faq" className={styles.link}>FAQ</Link>
        <Link href="/faq#size-guide" className={styles.link}>Size Guide</Link>
        <Link href="/faq#delivery-and-returns" className={styles.link}>Returns and Exchange</Link>
        <Link href="/faq#delivery-and-returns" className={styles.link}>Delivery</Link>
      </div>

      <div className={styles.section}>
        <h2 className={styles.heading}>Resource</h2>
        <Link href="/terms-and-conditions" className={styles.link}>Terms &amp; Conditions</Link>
        <Link href="/privacy-policy" className={styles.link}>Privacy Policy</Link>
        <Link href="/legal-notice" className={styles.link}>Legal Notice</Link>
      </div>
    </div>
  );
}
