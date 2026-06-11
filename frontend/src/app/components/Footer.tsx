import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.column}>
        <h4 className={styles.columnTitle}>Assistance</h4>
        <Link href="/customer-care" className={styles.footerLink}>Customer Care</Link>
        <Link href="/delivery" className={styles.footerLink}>Delivery</Link>
        <Link href="/returns" className={styles.footerLink}>Returns & Exchanges</Link>
        <Link href="/size-guide" className={styles.footerLink}>Size Guide</Link>
      </div>
      
      <div className={styles.column}>
        <h4 className={styles.columnTitle}>Our World</h4>
        <Link href="/about" className={styles.footerLink}>About Ginkgo</Link>
        <Link href="/sustainability" className={styles.footerLink}>Sustainability</Link>
        <Link href="/stores" className={styles.footerLink}>Stores</Link>
      </div>

      <div className={styles.column}>
        <h4 className={styles.columnTitle}>Contact</h4>
        <Link href="/contact" className={styles.footerLink}>Contact Us</Link>
        <span className={styles.footerLink}>+84 (0) 123 456 789</span>
        <span className={styles.footerLink}>info@ginkgotshirts.com</span>
      </div>

      <div className={styles.column}>
        <h4 className={styles.columnTitle}>Follow Us</h4>
        <div className={styles.socials}>
          <Link href="https://instagram.com" className={styles.footerLink}>Instagram</Link>
          <Link href="https://facebook.com" className={styles.footerLink}>Facebook</Link>
          <Link href="https://pinterest.com" className={styles.footerLink}>Pinterest</Link>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <span>&copy; {new Date().getFullYear()} Ginkgo T-Shirts. All rights reserved.</span>
        <span>Premium French-Inspired Menswear & Accessories</span>
      </div>
    </footer>
  );
}
