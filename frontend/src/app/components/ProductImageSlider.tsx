'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './ProductImageSlider.module.css';

interface ProductImageSliderProps {
  images: string[];
  productName: string;
}

export default function ProductImageSlider({ images, productName }: ProductImageSliderProps) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent(c => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent(c => (c === images.length - 1 ? 0 : c + 1));

  if (images.length === 0) return null;

  return (
    <div className={styles.slider}>
      <div className={styles.viewport}>
        <div
          className={styles.track}
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((src, i) => (
            <div key={i} className={styles.slide}>
              <Image src={src} alt={`${productName} - Image ${i + 1}`} fill className={styles.image} />
            </div>
          ))}
        </div>

        <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={prev} aria-label="Previous image">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={next} aria-label="Next image">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M8 4L14 10L8 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className={styles.dots}>
        {images.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
