import ProductCard from "./ProductCard";
import styles from "./ProductGrid.module.css";

export default function ProductGrid({ products, onAddToCart, sortKey, onSortChange, isLoading }) {

  if (isLoading) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.grid}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className={styles.skeleton} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      {/* Toolbar */}
      <div className={styles.toolbar}>
        <p className={styles.count}>
          Showing <strong>{products.length}</strong> product{products.length !== 1 ? "s" : ""}
        </p>
        <div className={styles.sortWrap}>
          <label htmlFor="sort-select" className={styles.sortLabel}>Sort by:</label>
          <select
            id="sort-select"
            className={styles.sortSelect}
            value={sortKey}
            onChange={e => onSortChange(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating-desc">Rating: High → Low</option>
            <option value="name-asc">Name: A → Z</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      {products.length === 0 ? (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>🔍</span>
          <h3>No products found</h3>
          <p>Try adjusting your search, category, price, or star rating filters.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {products.map((p, i) => (
            <ProductCard
              key={p.id}
              product={p}
              onAddToCart={onAddToCart}
              delay={Math.min(i * 0.05, 0.5)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
