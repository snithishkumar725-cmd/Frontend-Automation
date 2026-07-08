import { useRef } from "react";
import { CATEGORIES } from "../data/products";
import styles from "./FilterBar.module.css";

const STAR_OPTS = [
  { val: 0, label: "All" },
  { val: 1, label: "⭐ 1+" },
  { val: 2, label: "⭐ 2+" },
  { val: 3, label: "⭐ 3+" },
  { val: 4, label: "⭐ 4+" },
  { val: 5, label: "⭐ 5" },
];

export default function FilterBar({ filters, onFilterChange, onReset }) {
  const searchRef = useRef(null);

  function set(key, val) {
    onFilterChange({ ...filters, [key]: val });
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>

        {/* ── Search ── */}
        <div className={`${styles.group} ${styles.groupWide}`}>
          <label className={styles.label}>
            <span>🔍</span> Search Product
          </label>
          <div className={styles.searchBox}>
            <span className={styles.searchIcon}>🔎</span>
            <input
              ref={searchRef}
              type="text"
              className={styles.input}
              placeholder="Name, category… e.g. Headphones"
              value={filters.query}
              onChange={e => set("query", e.target.value)}
              id="search-input"
            />
            {filters.query && (
              <button
                className={styles.clearBtn}
                onClick={() => { set("query", ""); searchRef.current?.focus(); }}
                aria-label="Clear search"
              >×</button>
            )}
          </div>
        </div>

        {/* ── Category ── */}
        <div className={styles.group}>
          <label className={styles.label}><span>📂</span> Category</label>
          <select
            className={styles.select}
            value={filters.category}
            onChange={e => set("category", e.target.value)}
            id="category-select"
          >
            {CATEGORIES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* ── Price ── */}
        <div className={styles.group}>
          <label className={styles.label}><span>💰</span> Price (₹)</label>
          <div className={styles.priceRow}>
            <input
              type="number"
              className={styles.priceInput}
              placeholder="Min"
              min={0}
              value={filters.priceMin}
              onChange={e => set("priceMin", e.target.value)}
              id="price-min"
            />
            <span className={styles.priceSep}>—</span>
            <input
              type="number"
              className={styles.priceInput}
              placeholder="Max"
              min={0}
              value={filters.priceMax}
              onChange={e => set("priceMax", e.target.value)}
              id="price-max"
            />
          </div>
        </div>

        {/* ── Stars ── */}
        <div className={styles.group}>
          <label className={styles.label}><span>⭐</span> Min Rating</label>
          <div className={styles.starRow} role="group" aria-label="Star rating filter">
            {STAR_OPTS.map(opt => (
              <button
                key={opt.val}
                id={`star-btn-${opt.val}`}
                className={`${styles.starBtn} ${filters.minStar === opt.val ? styles.starActive : ""}`}
                onClick={() => set("minStar", opt.val)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Reset ── */}
        <button className={styles.resetBtn} onClick={onReset} id="btn-reset">
          ✕ Reset
        </button>
      </div>
    </div>
  );
}
