"use client";

import { useEffect } from 'react';
import { useCurrency } from '../context/CurrencyContext';
import styles from './Overlays.module.css';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { convert } = useCurrency();

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlayBackdrop} onClick={onClose} />
      <div className={styles.cartDrawer} role="dialog" aria-modal="true" aria-label="Your Cart">
        <div className={styles.drawerHeader}>
          <h2>Your Cart</h2>
          <button onClick={onClose} className={styles.closeButton} aria-label="Close cart">×</button>
        </div>
        <div className={styles.drawerBody}>
          <p className={styles.emptyCartMessage}>Your cart is currently empty.</p>
        </div>
        <div className={styles.drawerFooter}>
          <button className={styles.checkoutButton}>Checkout - {convert(0)}</button>
        </div>
      </div>
    </>
  );
}
