import Image from 'next/image';
import styles from './AboutUs.module.css';

export default function AboutUsPage() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Clothes inspired by Vietnam</h1>
          <p className={styles.subtitle}>Kindled by a simplistic idea, built on creativity</p>
        </div>
        <div className={styles.heroImageWrapper}>
          <Image 
            src="/ginkgo1.jpg" 
            alt="Clothes inspired by Vietnam" 
            fill 
            className={styles.heroImage} 
            priority
          />
        </div>
      </section>

      {/* Intro Section */}
      <section className={styles.gallerySection}>
        <h2 className={styles.headingCenter}>Our Story</h2>
        <p className={styles.paragraph} style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto', fontSize: '1.2rem' }}>
          Ginkgo T-shirts has been spending its 17 years in Vietnam until now for one solid purpose: inspire people with culture-driven designs made in Vietnam. Each item under the name Ginkgo is truly a piece of culture representing the vibrancy weaved in not only traditional values but also the pacing everyday life.
        </p>
      </section>

      {/* Culture Section */}
      <section className={styles.philosophySection}>
        <div className={styles.textColumn}>
          <h2 className={styles.heading}>Vietnamese Culture</h2>
          <p className={styles.paragraph}>
            <strong>Vietnamese culture makes Ginkgo Unique</strong>
          </p>
          <p className={styles.paragraph}>
            Ginkgo was born with a single idea: inspire our customers with vietnamese culture graphics to ensure that when you share your memories at home, the design, creativity and high quality reflect the true culture of Vietnam.
          </p>
        </div>
        <div className={styles.imageColumn}>
          <div className={styles.imageWrapperSquare}>
            <Image src="/ginkgo3.jpg" alt="Vietnamese culture graphics" fill className={styles.image} />
          </div>
        </div>
      </section>

      {/* Fabric Section */}
      <section className={`${styles.philosophySection} ${styles.reverse}`}>
        <div className={styles.textColumn}>
          <h2 className={styles.heading}>Unique Fabrics</h2>
          <p className={styles.paragraph}>
            <strong>Unique fabrics in organic & Supime Cotton or Linen</strong>
          </p>
          <p className={styles.paragraph}>
            At Ginkgo, we've been designing t-shirts for 17 years. Either it's our GOTS certified organic cotton fabric, or our suprima, or linen, you only get fabrics we fought for. They are unique, high quality.
          </p>
        </div>
        <div className={styles.imageColumn}>
          <div className={styles.imageWrapperSquare}>
            <Image src="/ginkgo2.jpg" alt="Organic & Supime Cotton or Linen" fill className={styles.image} />
          </div>
        </div>
      </section>

      {/* Stores Section */}
      <section className={styles.philosophySection}>
        <div className={styles.textColumn}>
          <h2 className={styles.heading}>Ginkgo T-shirt Stores</h2>
          <p className={styles.paragraph}>
            <strong>Ginkgo T-shirt clothes concept stores</strong>
          </p>
          <p className={styles.paragraph}>
            The layout and design of our stores convey an image of style, comfort, high quality, cheerfulness from Saigon to Hanoi via Hoi An. Our stores send the message that Ginkgo is a brand with a relaxed and dynamic style.
          </p>
        </div>
        <div className={styles.imageColumn}>
          <div className={styles.imageWrapperSquare}>
            <Image src="/ginkgo4.jpg" alt="Ginkgo T-shirt clothes concept stores" fill className={styles.image} />
          </div>
        </div>
      </section>
    </div>
  );
}
