import styles from './SkeletonCard.module.css';

export default function SkeletonCard() {
  return (
    <div className={styles.card}>
      <div className={`${styles.block} ${styles.image}`} />
      <div className={styles.info}>
        <div className={`${styles.block} ${styles.line}`} />
        <div className={`${styles.block} ${styles.lineShort}`} />
        <div className={`${styles.block} ${styles.lineMedium}`} />
      </div>
    </div>
  );
}
