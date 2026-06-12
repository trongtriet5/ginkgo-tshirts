import Link from 'next/link';
import { MdFacebook } from 'react-icons/md';
import { FaYoutube, FaLinkedin, FaInstagram } from 'react-icons/fa';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.column}>
        <h4 className={styles.columnTitle}>Help</h4>
        <Link href="/faq" className={styles.footerLink}>FAQ</Link>
        <Link href="/faq#size-guide" className={styles.footerLink}>Size guide</Link>
        <Link href="/faq#delivery-and-returns" className={styles.footerLink}>Returns and exchange</Link>
        <Link href="/faq#delivery-and-returns" className={styles.footerLink}>Delivery</Link>
      </div>

      <div className={styles.column}>
        <h4 className={styles.columnTitle}>Our World</h4>
        <Link href="/the-world-of-ginkgo/story" className={styles.footerLink}>Story</Link>
        <Link href="/the-world-of-ginkgo/stores" className={styles.footerLink}>Stores</Link>
        <Link href="/the-world-of-ginkgo/creations" className={styles.footerLink}>Creations</Link>
      </div>

      <div className={styles.column}>
        <h4 className={styles.columnTitle}>Contact</h4>
        <span className={styles.footerAddress}>
          <strong>France</strong><br />
          Ginkgo T-shirts<br />
          56 rue permentade<br />
          33000 Bordeaux
        </span>
        <span className={styles.footerAddress}>
          <strong>Vietnam</strong><br />
          Ginkgo T-shirts<br />
          92-96 Le Loi street<br />
          District 1<br />
          Ho Chi Minh City, Vietnam
        </span>
        <a href="tel:+842838386161" className={styles.footerLink}>+84 28 3838 6161</a>
        <a href="mailto:info@ginkgotshirts.com" className={styles.footerLink}>info@ginkgotshirts.com</a>
      </div>

      <div className={styles.column}>
        <h4 className={styles.columnTitle}>Resource</h4>
        <Link href="/terms-and-conditions" className={styles.footerLink}>Terms &amp; Conditions</Link>
        <Link href="/privacy-policy" className={styles.footerLink}>Privacy Policy</Link>
        <Link href="/legal-notice" className={styles.footerLink}>Legal Notice</Link>
        <Link href="/sitemap" className={styles.footerLink}>Sitemap</Link>
      </div>

      <div className={styles.column}>
        <h4 className={styles.columnTitle}>Follow Us</h4>
        <div className={styles.socials}>
          <Link href="https://www.facebook.com/Ginkgotshirts" className={styles.socialIcon} aria-label="Facebook">
            <MdFacebook size={22} />
          </Link>
          <Link href="https://www.youtube.com/@ginkgotshirts" className={styles.socialIcon} aria-label="YouTube">
            <FaYoutube size={22} />
          </Link>
          <Link href="https://www.instagram.com/ginkgotshirts" className={styles.socialIcon} aria-label="Instagram">
            <FaInstagram size={22} />
          </Link>
          <Link href="https://www.linkedin.com/company/ginkgo-t-shirts/" className={styles.socialIcon} aria-label="LinkedIn">
            <FaLinkedin size={22} />
          </Link>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <span>&copy; {new Date().getFullYear()} Ginkgo T-Shirts. All rights reserved.</span>
      </div>
    </footer>
  );
}
