import { useEffect, useRef } from "react";
import { formatPrice } from "../data/products";
import styles from "./CartDrawer.module.css";

export default function CartDrawer({ cart, open, onClose, onRemove, onClear }) {
  const drawerRef = useRef(null);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  useEffect(() => {
    if (open) drawerRef.current?.focus();
    const onKey = e => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`${styles.overlay} ${open ? styles.overlayVisible : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        ref={drawerRef}
        className={`${styles.drawer} ${open ? styles.drawerOpen : ""}`}
        role="dialog"
        aria-label="Shopping cart"
        tabIndex={-1}
      >
        <div className={styles.header}>
          <h2 className={styles.title}>🛒 Your Cart</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close cart">×</button>
        </div>

        {cart.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>🛍️</span>
            <p>Your cart is empty.</p>
            <small>Add some products to get started!</small>
          </div>
        ) : (
          <>
            <div className={styles.items}>
              {cart.map(item => (
                <div key={item.id} className={styles.item} id={`cart-item-${item.id}`}>
                  <span className={styles.itemEmoji}>{item.emoji}</span>
                  <div className={styles.itemInfo}>
                    <p className={styles.itemName}>{item.name}</p>
                    <p className={styles.itemMeta}>
                      {formatPrice(item.price)} × {item.qty}
                    </p>
                  </div>
                  <div className={styles.itemRight}>
                    <p className={styles.itemTotal}>{formatPrice(item.price * item.qty)}</p>
                    <button
                      className={styles.removeBtn}
                      onClick={() => onRemove(item.id)}
                      aria-label={`Remove ${item.name}`}
                    >🗑️</button>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.footer}>
              <div className={styles.totalRow}>
                <span className={styles.totalLabel}>Total</span>
                <span className={styles.totalVal}>{formatPrice(total)}</span>
              </div>
              <button className={styles.checkoutBtn}>
                ⚡ Checkout Now
              </button>
              <button className={styles.clearBtn} onClick={onClear}>
                Clear All
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
