import styles from './page.module.css';

export default function CreationsPage() {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1 className={styles.title}>Creations</h1>
        <p className={styles.subtitle}>The art of making quality t-shirts</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>Graphics</h2>
        <p className={styles.paragraph}>
          In Vietnam, 30 million motorcycles... And at Ginkgo, over 200 graphics to stand out! Ginkgo Vietnam was
          created with the aim of providing travelers with an alternative to the cheap t-shirt that was almost the
          only option. Culture is an unlimited source of inspiration and we have taken this opportunity to provide
          our clients with dozens of designs that can suit any personality. Our culture-driven graphics are the
          essence of our brand!
        </p>
        <p className={styles.paragraph}>
          Since 2007, 423 illustrations have been designed by our team or by local illustrators.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>Materials</h2>
        <div className={styles.materialGrid}>
          <div className={styles.materialCard}>
            <h3 className={styles.materialTitle}>Organic Cotton</h3>
            <p className={styles.materialText}>
              Only 0.95% of production of the world&apos;s cotton is organic. Over 50% of Ginkgo T-shirts are made
              with organic cotton. Our organic cotton is GOTS certified.
            </p>
          </div>
          <div className={styles.materialCard}>
            <h3 className={styles.materialTitle}>Supima Cotton</h3>
            <p className={styles.materialText}>
              Supima cotton grows in a desert climate. Always on the lookout for top quality fabric alternatives, we
              offer the supima series, responding to a growing demand for super comfortable, light, breathable, soft
              and fresh products.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>Manufacture</h2>
        <p className={styles.paragraph}>
          Ginkgo T-Shirt has become an expert at every step of the t-shirt manufacturing process, from sourcing to
          production. We love the details that make the difference. In order to shape this brand experience, we
          rigorously train our workers, follow strict quality control procedures, invest in efficient machinery, and
          establish a clean and safe working environment.
        </p>
        <div className={styles.techniqueGrid}>
          <div className={styles.techniqueCard}>
            <h3 className={styles.techniqueTitle}>Serigraphy</h3>
            <p className={styles.techniqueText}>
              Our screen printing expertise allows us to produce long lasting prints in any range of colors and
              shades while controlling strong contrasts and subtle harmonies.
            </p>
          </div>
          <div className={styles.techniqueCard}>
            <h3 className={styles.techniqueTitle}>Embroidery</h3>
            <p className={styles.techniqueText}>
              We wanted to infuse tradition into our creations via two production methods: mechanical embroidery and
              hand embroidery. We have hired and trained a team of highly skilled workers to operate our high end
              machines.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
