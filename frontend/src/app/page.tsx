"use client";

import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <span className={styles.heroTag}>New Season</span>
          <h1 className={styles.heroTitle}>The Spring Edit:<br />Effortless Parisian Style</h1>
          <Link href="/new-arrivals">
            <button className={styles.heroButton}>Shop New Arrivals</button>
          </Link>
        </div>
        <div className={styles.heroRight}>
          <div className={styles.heroImagePlaceholder}>
            {/* Image Placeholder */}
          </div>
        </div>
      </section>

      {/* Featured Collection Banner */}
      <section className={styles.featured}>
        <h2 className={styles.featuredTitle}>L'Atelier Ginkgo</h2>
        <p className={styles.featuredStory}>
          Discover our latest collection inspired by the streets of Paris and the vibrant energy of Vietnam. Crafted with premium organic cotton and timeless silhouettes.
        </p>
        
        <div className={styles.featuredGrid}>
          <div className={styles.productCard}>Product 1</div>
          <div className={styles.productCard}>Product 2</div>
          <div className={styles.productCard}>Product 3</div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className={styles.newsletter}>
        <h3 className={styles.newsletterTitle}>Join the Ginkgo Community</h3>
        <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Enter your email address" 
            className={styles.newsletterInput}
            required
          />
          <button type="submit" className={styles.newsletterButton}>Subscribe</button>
        </form>
      </section>

    </main>
  );
}
