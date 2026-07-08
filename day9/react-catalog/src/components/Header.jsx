import { useState } from "react";
import styles from "./Header.module.css";

export default function Header({ cartCount, onCartClick }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>⚡</div>
        <span className={styles.logoText}>TechVault</span>
      </div>

      <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}>
        <a href="#" className={styles.navLink} onClick={() => setMenuOpen(false)}>Home</a>
        <a href="#" className={styles.navLink} onClick={() => setMenuOpen(false)}>Deals</a>
        <a href="#" className={styles.navLink} onClick={() => setMenuOpen(false)}>New Arrivals</a>
        <a href="#" className={styles.navLink} onClick={() => setMenuOpen(false)}>Support</a>
      </nav>

      <div className={styles.actions}>
        <button className={styles.cartBtn} onClick={onCartClick} aria-label="Cart">
          <span className={styles.cartIcon}>🛒</span>
          {cartCount > 0 && (
            <span className={styles.cartBadge}>{cartCount}</span>
          )}
        </button>
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
