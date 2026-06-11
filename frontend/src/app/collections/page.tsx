import styles from './page.module.css';

export default function CollectionsPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Collections</h1>
      <p className={styles.subtitle}>
        Explore our curated edits and seasonal campaigns, crafted with the spirit of French minimalism and Vietnamese heritage.
      </p>

      <div className={styles.grid}>
        <div className={styles.collectionCard}>The Spring Edit</div>
        <div className={styles.collectionCard}>Parisian Essentials</div>
        <div className={styles.collectionCard}>L'Atelier Organic</div>
        <div className={styles.collectionCard}>Summer Classics</div>
      </div>
    </div>
  );
}
