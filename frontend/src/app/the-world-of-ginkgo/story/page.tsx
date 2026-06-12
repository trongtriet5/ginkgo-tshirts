import Image from 'next/image';
import styles from './page.module.css';

export default function StoryPage() {
  return (
    <div className={styles.container}>
      <section className={styles.heroSection}>
        <div className={styles.heroImageWrapper}>
          <Image
            src="/hero-section-theworldofginkgo-story.png"
            alt=""
            fill
            className={styles.heroImage}
            priority
          />
        </div>
      </section>

      <section className={styles.introSection}>
        <h2 className={styles.headingCenter}>Our Story</h2>
        <p className={styles.paragraphCenter}>A 17-year adventure</p>
      </section>

      <section className={styles.philosophySection}>
        <div className={styles.textColumn}>
          <h2 className={styles.heading}><span className={styles.underline}>The</span> Beginning</h2>
          <p className={styles.paragraph}>
            After a trip to Vietnam, the seed was sown in 2006. The desire to create beautiful quality t-shirts, the
            passion for graphics and a strong inspiration from Asian culture were the three ingredients at the origin
            of Ginkgo. Beginnings in the depths of the Mekong. A unique culture. A city that does not sleep. A love
            story.
          </p>
          <p className={styles.paragraph}>
            In August 2007, a tiny 7 m&sup2; boutique opened in Pham Ngu Lao Street in Ho Chi Minh City.
          </p>
        </div>
        <div className={styles.imageColumn}>
          <div className={styles.imageWrapperSquare}>
            <Image src="/the-begining-theworldofginkgo-story.png" alt="" fill className={styles.image} />
          </div>
        </div>
      </section>

      <section className={`${styles.philosophySection} ${styles.reverse}`}>
        <div className={styles.textColumn}>
          <h2 className={styles.heading}><span className={styles.underline}>The</span> Logo</h2>
          <p className={styles.paragraph}>
            <strong>Ginkgo Biloba — the first tree to grow after the cataclysm</strong>
          </p>
          <p className={styles.paragraph}>
            Yellow is energy, it is autumn, it is introspection. The leaf is the beauty of nature, the cycle of life
            that takes its roots in nourishing soil and grows unconditionally in an ephemeral cosmic dance. Its name,
            Ginkgo Biloba, sounds like a hopeful mantra.
          </p>
        </div>
        <div className={styles.imageColumn}>
          <div className={styles.imageWrapperSquare}>
            <Image src="/the-logo-theworldofginkgo-story.png" alt="" fill className={styles.image} />
          </div>
        </div>
      </section>

      <section className={styles.philosophySection}>
        <div className={styles.textColumn}>
          <h2 className={styles.heading}><span className={styles.underline}>Develop</span>ment</h2>
          <p className={styles.paragraph}>
            Ginkgo is immediately a quality t-shirt, solid, designed to last, well cut, superb knits, and everything
            in detail. It&apos;s also a lot of organic cotton. The rest is a thirteen year expansion from Saigon to
            Hanoi via Nha Trang and Hoi An.
          </p>
        </div>
        <div className={styles.imageColumn}>
          <div className={styles.imageWrapperSquare}>
            <Image src="/development-theworldofginkgo-story.png" alt="" fill className={styles.image} />
          </div>
        </div>
      </section>

      <section className={`${styles.philosophySection} ${styles.reverse}`}>
        <div className={styles.textColumn}>
          <h2 className={styles.heading}><span className={styles.underline}>Con</span>cept</h2>
          <p className={styles.paragraph}>
            In 2012, we opened our own clothing workshop to better control quality and working conditions.
          </p>
          <p className={styles.paragraph}>
            In 2015, we created Ginkgo Voyage to satisfy our desire to organize unforgettable stays for our visitors.
          </p>
        </div>
        <div className={styles.imageColumn}>
          <div className={styles.imageWrapperSquare}>
            <Image src="/concept-theworldofginkgo-story.png" alt="" fill className={styles.image} />
          </div>
        </div>
      </section>

      <section className={styles.philosophySection}>
        <div className={styles.textColumn}>
          <h2 className={styles.heading}><span className={styles.underline}>The T-shirt</span> According to Ginkgo</h2>
          <p className={styles.paragraph}>
            <strong>Between Ginkgo and the t-shirt, it&apos;s a love story that lasts</strong>
          </p>
          <p className={styles.paragraph}>
            At Ginkgo, we&apos;ve been designing, drawing, making, cutting, assembling, reassembling, disassembling,
            observing, tearing, burning t-shirts for 17 years. We take a picture of them, we animate them, we wear
            them, we wash them and rewash them, we post them, we look at them and we cut them.
          </p>
        </div>
        <div className={styles.imageColumn}>
          <div className={styles.imageWrapperSquare}>
            <Image src="/the-according-theworldofginkgo-story.png" alt="" fill className={styles.image} />
          </div>
        </div>
      </section>
    </div>
  );
}
