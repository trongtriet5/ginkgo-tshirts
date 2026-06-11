import styles from './page.module.css';

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  return (
    <div className={styles.container}>
      <div className={styles.imageGallery}>
        <div className={styles.imagePlaceholder} style={{background: '#eaeaea'}} />
        <div className={styles.imagePlaceholder} style={{background: '#dcdcdc'}} />
        <div className={styles.imagePlaceholder} style={{background: '#cccccc'}} />
        <div className={styles.imagePlaceholder} style={{background: '#bbbbbb'}} />
      </div>

      <div className={styles.details}>
        <span className={styles.brand}>L'Atelier Ginkgo</span>
        <h1 className={styles.title}>Organic Cotton T-Shirt {id}</h1>
        <div className={styles.price}>€45</div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>Color: Blanc</div>
          <div className={styles.colorOptions}>
            <button className={styles.colorSwatch} style={{ backgroundColor: '#ffffff' }} aria-label="Blanc" />
            <button className={styles.colorSwatch} style={{ backgroundColor: '#000000' }} aria-label="Noir" />
            <button className={styles.colorSwatch} style={{ backgroundColor: '#1a365d' }} aria-label="Navy" />
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>
            <span>Size</span>
            <span style={{ textDecoration: 'underline', cursor: 'pointer', color: 'var(--color-text-tertiary)'}}>Size Guide</span>
          </div>
          <div className={styles.sizeOptions}>
            <button className={styles.sizeButton}>S</button>
            <button className={styles.sizeButton}>M</button>
            <button className={styles.sizeButton}>L</button>
            <button className={styles.sizeButton}>XL</button>
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.addToCart}>Add to Bag</button>
          <button className={styles.wishlist}>Save to Wishlist</button>
        </div>

        <div className={styles.description}>
          <p>
            Crafted from 100% premium organic cotton, this t-shirt offers a relaxed, effortless fit. Inspired by Parisian streetwear and tailored for comfort. Features a classic crew neckline and short sleeves.
          </p>
        </div>
      </div>
    </div>
  );
}
