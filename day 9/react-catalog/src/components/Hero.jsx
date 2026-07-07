import styles from "./Hero.module.css";

export default function Hero({ totalProducts }) {
  return (
    <section className={styles.hero}>
      <div className={styles.pill}>✨ 2026 Premium Collection — {totalProducts} Products</div>
      <h1 className={styles.heading}>
        <span className="gradient-text">Discover Premium</span>
        <br />
        <span className="gradient-text">Tech Products</span>
      </h1>
      <p className={styles.sub}>
        Search by name, filter by price range &amp; star rating. Sort, explore,
        and add to cart — all in real time.
      </p>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statNum}>18+</span>
          <span className={styles.statLabel}>Products</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.stat}>
          <span className={styles.statNum}>8</span>
          <span className={styles.statLabel}>Categories</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.stat}>
          <span className={styles.statNum}>4.6★</span>
          <span className={styles.statLabel}>Avg Rating</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.stat}>
          <span className={styles.statNum}>60%</span>
          <span className={styles.statLabel}>Max Discount</span>
        </div>
      </div>
    </section>
  );
}
