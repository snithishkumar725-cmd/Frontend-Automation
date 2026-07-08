import { useState } from "react";
import { BADGE_MAP, formatPrice, renderStars } from "../data/products";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product, onAddToCart, delay = 0 }) {
  const [added, setAdded] = useState(false);
  const badge = BADGE_MAP[product.badge];
  const stars = renderStars(product.rating);
  const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);

  function handleAdd(e) {
    e.stopPropagation();
    setAdded(true);
    onAddToCart(product);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <article
      className={styles.card}
      style={{ animationDelay: `${delay}s` }}
      id={`product-${product.id}`}
    >
      {/* Discount strip */}
      <div className={`${styles.badge} ${styles[badge.cls]}`}>{badge.label}</div>
      <div className={styles.discount}>-{discount}%</div>

      {/* Image area */}
      <div className={styles.imgWrap}>
        <span className={styles.emoji}>{product.emoji}</span>
      </div>

      {/* Body */}
      <div className={styles.body}>
        <p className={styles.category}>{product.category}</p>
        <h2 className={styles.name}>{product.name}</h2>
        <p className={styles.desc}>{product.desc}</p>

        {/* Stars */}
        <div className={styles.starsRow}>
          <div className={styles.stars}>
            {stars.map((type, i) => (
              <span key={i} className={`${styles.star} ${styles[type]}`}>★</span>
            ))}
          </div>
          <span className={styles.ratingNum}>{product.rating.toFixed(1)}</span>
          <span className={styles.reviews}>({product.reviews.toLocaleString("en-IN")})</span>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <div className={styles.priceBlock}>
            <span className={styles.oldPrice}>{formatPrice(product.oldPrice)}</span>
            <span className={styles.newPrice}>{formatPrice(product.price)}</span>
          </div>
          <button
            className={`${styles.cartBtn} ${added ? styles.cartAdded : ""}`}
            onClick={handleAdd}
            id={`add-cart-${product.id}`}
            aria-label={`Add ${product.name} to cart`}
          >
            {added ? "✓ Added!" : "🛒 Add"}
          </button>
        </div>
      </div>
    </article>
  );
}
