import Link from 'next/link';
import styles from './Footer.module.css';

const stores = [
  {
    city: 'Saigon',
    addresses: [
      '10 Le Loi Street, District 1',
      '86 Le Loi Street, District 1',
      '107 Dong Khoi Street, District 1',
      '92-96 Le Loi Street, District 1',
    ],
  },
  {
    city: 'Hoi An',
    addresses: [
      '115 Tran Phu Street',
      '178 Tran Phu Street',
    ],
  },
  {
    city: 'Hanoi',
    addresses: [
      '49 Dinh Tien Hoang Street, Hoan Kiem',
      '60 Hang Gai Street, Hoan Kiem',
      '79 Hang Gai Street, Hoan Kiem',
      '44 Hang Be Street, Hoan Kiem',
      '10 Hang Dao Street',
    ],
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.column}>
        <h4 className={styles.columnTitle}>Assistance</h4>
        <span className={styles.footerLink}>Customer Care</span>
        <span className={styles.footerLink}>Delivery</span>
        <span className={styles.footerLink}>Returns & Exchanges</span>
        <span className={styles.footerLink}>Size Guide</span>
      </div>

      <div className={styles.column}>
        <h4 className={styles.columnTitle}>Our World</h4>
        <Link href="/" className={styles.footerLink}>About Ginkgo</Link>
        <span className={styles.footerLink}>Sustainability</span>
        <span className={styles.footerLink}>Stores</span>
      </div>

      <div className={styles.column}>
        <h4 className={styles.columnTitle}>Contact</h4>
        <span className={styles.footerLink}>Contact Us</span>
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

      <div className={styles.storesRow}>
        <h4 className={styles.storesTitle}>Our Stores</h4>
        <div className={styles.storesGrid}>
          {stores.map((store) => (
            <div key={store.city} className={styles.storeCity}>
              <h5 className={styles.storeCityName}>{store.city}</h5>
              {store.addresses.map((addr) => (
                <span key={addr} className={styles.storeAddress}>{addr}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.bottomBar}>
        <span>&copy; {new Date().getFullYear()} Ginkgo T-Shirts. All rights reserved.</span>
        <span>Premium French-Inspired Menswear & Accessories</span>
      </div>
    </footer>
  );
}
