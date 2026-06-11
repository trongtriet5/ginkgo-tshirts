import styles from './Overlays.module.css';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlayBackdrop} onClick={onClose} />
      <div className={styles.cartDrawer}>
        <div className={styles.drawerHeader}>
          <h2>Your Cart</h2>
          <button onClick={onClose} className={styles.closeButton}>×</button>
        </div>
        <div className={styles.drawerBody}>
          <p className={styles.emptyCartMessage}>Your cart is currently empty.</p>
        </div>
        <div className={styles.drawerFooter}>
          <button className={styles.checkoutButton}>Checkout - €0</button>
        </div>
      </div>
    </>
  );
}
