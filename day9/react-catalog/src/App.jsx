import { useState, useMemo, useCallback, useRef } from "react";
import { PRODUCTS } from "./data/products";
import Header from "./components/Header";
import Hero from "./components/Hero";
import FilterBar from "./components/FilterBar";
import ProductGrid from "./components/ProductGrid";
import CartDrawer from "./components/CartDrawer";
import Toast from "./components/Toast";
import "./index.css";

const DEFAULT_FILTERS = {
  query: "",
  category: "All",
  priceMin: "",
  priceMax: "",
  minStar: 0,
};

export default function App() {
  /* ── Filters & Sort ── */
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [sortKey, setSortKey] = useState("default");

  /* ── Cart ── */
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  /* ── Toast ── */
  const [toast, setToast] = useState({ msg: "", visible: false });
  const toastTimer = useRef(null);

  function showToast(msg) {
    clearTimeout(toastTimer.current);
    setToast({ msg, visible: true });
    toastTimer.current = setTimeout(() => {
      setToast(t => ({ ...t, visible: false }));
    }, 2800);
  }

  /* ── Add to Cart ── */
  const handleAddToCart = useCallback((product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    showToast(`✅ "${product.name}" added to cart!`);
  }, []);

  /* ── Remove from Cart ── */
  const handleRemove = useCallback((id) => {
    setCart(prev => prev.filter(i => i.id !== id));
  }, []);

  /* ── Clear Cart ── */
  const handleClear = useCallback(() => {
    setCart([]);
    showToast("🗑️ Cart cleared!");
  }, []);

  /* ── Reset Filters ── */
  const handleReset = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setSortKey("default");
    showToast("🔄 Filters reset!");
  }, []);

  /* ── Filtered + Sorted Products ── */
  const displayed = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    const minP = parseFloat(filters.priceMin) || 0;
    const maxP = parseFloat(filters.priceMax) || Infinity;

    let result = PRODUCTS.filter(p => {
      const matchQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q);
      const matchCategory =
        filters.category === "All" || p.category === filters.category;
      const matchPrice = p.price >= minP && p.price <= maxP;
      const matchStar = p.rating >= filters.minStar;
      return matchQuery && matchCategory && matchPrice && matchStar;
    });

    if (sortKey === "price-asc")    result = [...result].sort((a,b) => a.price - b.price);
    if (sortKey === "price-desc")   result = [...result].sort((a,b) => b.price - a.price);
    if (sortKey === "rating-desc")  result = [...result].sort((a,b) => b.rating - a.rating);
    if (sortKey === "name-asc")     result = [...result].sort((a,b) => a.name.localeCompare(b.name));

    return result;
  }, [filters, sortKey]);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <>
      <Header
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
      />

      <main>
        <Hero totalProducts={PRODUCTS.length} />

        <FilterBar
          filters={filters}
          onFilterChange={setFilters}
          onReset={handleReset}
        />

        <ProductGrid
          products={displayed}
          onAddToCart={handleAddToCart}
          sortKey={sortKey}
          onSortChange={setSortKey}
          isLoading={false}
        />
      </main>

      <CartDrawer
        cart={cart}
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onRemove={handleRemove}
        onClear={handleClear}
      />

      <Toast message={toast.msg} visible={toast.visible} />
    </>
  );
}
