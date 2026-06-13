import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <section className={styles.heroSection}>
        <div className={styles.heroImageWrapper}>
          <Image
            src="/hero.jpg"
            alt=""
            fill
            className={styles.heroImage}
            priority
          />
        </div>
      </section>

      <section className={styles.gallerySection}>
        <h2 className={styles.headingCenter}>Our Story</h2>
        <p className={styles.paragraphCenter}>
          Ginkgo T-shirts has been spending its 17 years in Vietnam until now for one solid purpose: inspire people with culture-driven designs made in Vietnam. Each item under the name Ginkgo is truly a piece of culture representing the vibrancy weaved in not only traditional values but also the pacing everyday life.
        </p>
      </section>

      <section className={styles.philosophySection}>
        <div className={styles.textColumn}>
          <h2 className={styles.heading}><span className={styles.underline}>Vietnamese</span> Culture</h2>
          <p className={styles.paragraph}>
            <strong>Vietnamese culture makes Ginkgo Unique</strong>
          </p>
          <p className={styles.paragraph}>
            Ginkgo was born with a single idea: inspire our customers with vietnamese culture graphics to ensure that when you share your memories at home, the design, creativity and high quality reflect the true culture of Vietnam.
          </p>
        </div>
        <div className={styles.imageColumn}>
          <div className={styles.imageWrapperSquare}>
            <Image src="/vietnamese_culture.jpg" alt="" fill sizes="50vw" className={styles.image} />
          </div>
        </div>
      </section>

      <section className={`${styles.philosophySection} ${styles.reverse}`}>
        <div className={styles.textColumn}>
          <h2 className={styles.heading}><span className={styles.underline}>Unique</span> Fabrics</h2>
          <p className={styles.paragraph}>
            <strong>Unique fabrics in organic & Supime Cotton or Linen</strong>
          </p>
          <p className={styles.paragraph}>
            At Ginkgo, we&apos;ve been designing t-shirts for 17 years. Either it&apos;s our GOTS certified organic cotton fabric, or our suprima, or linen, you only get fabrics we fought for. They are unique, high quality.
          </p>
        </div>
        <div className={styles.imageColumn}>
          <div className={styles.imageWrapperSquare}>
            <Image src="/unique_fabric.jpg" alt="" fill sizes="50vw" className={styles.image} />
          </div>
        </div>
      </section>

      <section className={styles.philosophySection}>
        <div className={styles.textColumn}>
          <h2 className={styles.heading}><span className={styles.underline}>Ginkgo</span> T-shirt Stores</h2>
          <p className={styles.paragraph}>
            <strong>Ginkgo T-shirt clothes concept stores</strong>
          </p>
          <p className={styles.paragraph}>
            The layout and design of our stores convey an image of style, comfort, high quality, cheerfulness from Saigon to Hanoi via Hoi An. Our stores send the message that Ginkgo is a brand with a relaxed and dynamic style.
          </p>
        </div>
        <div className={styles.imageColumn}>
          <div className={styles.imageWrapperSquare}>
            <Image src="/ginkgo_concept_store.jpg" alt="" fill sizes="50vw" className={styles.image} />
          </div>
        </div>
      </section>
    </div>
  );
}
