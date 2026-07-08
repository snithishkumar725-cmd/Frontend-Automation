import { useState, useEffect, useCallback } from 'react'
import './App.css'

// ── Product data ──────────────────────────────────────────────────────────────
const ALL_PRODUCTS = [
  // Electronics
  { id: 1, name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones', brand: 'Sony', category: 'Electronics', price: 348, original: 399, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', rating: 4.8, reviews: 12847, badge: 'deal', prime: true, stock: 'in_stock', discount: 13 },
  { id: 2, name: 'Apple MacBook Air 15-inch M3 Chip Laptop (2024)', brand: 'Apple', category: 'Electronics', price: 1299, original: 1499, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop', rating: 4.9, reviews: 5231, badge: 'new', prime: true, stock: 'in_stock', discount: 13 },
  { id: 3, name: 'Samsung 65" Class QLED 4K Smart TV Crystal Clear Display', brand: 'Samsung', category: 'Electronics', price: 897, original: 1199, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=400&h=400&fit=crop', rating: 4.6, reviews: 8432, badge: 'sale', prime: true, stock: 'in_stock', discount: 25 },
  { id: 4, name: 'iPad Pro 12.9-inch (6th Gen) Wi-Fi 256GB Silver', brand: 'Apple', category: 'Electronics', price: 1099, original: 1199, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop', rating: 4.8, reviews: 3102, badge: null, prime: true, stock: 'low_stock', discount: 8 },
  { id: 5, name: 'Canon EOS R50 Content Creator Kit Mirrorless Camera', brand: 'Canon', category: 'Electronics', price: 799, original: 999, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop', rating: 4.7, reviews: 1876, badge: 'deal', prime: false, stock: 'in_stock', discount: 20 },
  { id: 6, name: 'JBL Flip 6 Portable Waterproof Bluetooth Speaker', brand: 'JBL', category: 'Electronics', price: 89, original: 129, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop', rating: 4.5, reviews: 22318, badge: 'sale', prime: true, stock: 'in_stock', discount: 31 },

  // Fashion
  { id: 7, name: 'Nike Air Max 270 React Mens Running Shoes White/Black', brand: 'Nike', category: 'Fashion', price: 129, original: 160, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop', rating: 4.6, reviews: 34521, badge: 'sale', prime: true, stock: 'in_stock', discount: 19 },
  { id: 8, name: 'Levi\'s 511 Slim Fit Men\'s Jeans Premium Stretch Denim', brand: 'Levi\'s', category: 'Fashion', price: 59, original: 79, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop', rating: 4.4, reviews: 18294, badge: null, prime: true, stock: 'in_stock', discount: 25 },
  { id: 9, name: 'Ray-Ban Aviator Classic Polarized UV400 Sunglasses', brand: 'Ray-Ban', category: 'Fashion', price: 154, original: 193, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop', rating: 4.7, reviews: 9841, badge: 'prime', prime: true, stock: 'in_stock', discount: 20 },
  { id: 10, name: 'Fossil Gen 6 Smartwatch 44mm Stainless Steel Case', brand: 'Fossil', category: 'Fashion', price: 199, original: 279, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop', rating: 4.3, reviews: 7204, badge: 'deal', prime: false, stock: 'in_stock', discount: 29 },
  { id: 11, name: 'Herschel Supply Co. Classic Backpack 24L Canvas', brand: 'Herschel', category: 'Fashion', price: 75, original: 95, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop', rating: 4.5, reviews: 4932, badge: null, prime: true, stock: 'in_stock', discount: 21 },
  { id: 12, name: 'The North Face Thermoball Eco Jacket Women\'s Insulated', brand: 'The North Face', category: 'Fashion', price: 199, original: 250, image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&h=400&fit=crop', rating: 4.7, reviews: 3218, badge: 'new', prime: true, stock: 'low_stock', discount: 20 },

  // Home & Kitchen
  { id: 13, name: 'Instant Pot Duo 7-in-1 Electric Pressure Cooker 8-Quart', brand: 'Instant Pot', category: 'Home & Kitchen', price: 89, original: 129, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop', rating: 4.8, reviews: 52041, badge: 'deal', prime: true, stock: 'in_stock', discount: 31 },
  { id: 14, name: 'Ninja AF101 Air Fryer 4 QT Compact Countertop Oven', brand: 'Ninja', category: 'Home & Kitchen', price: 79, original: 100, image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&h=400&fit=crop', rating: 4.7, reviews: 38210, badge: 'sale', prime: true, stock: 'in_stock', discount: 21 },
  { id: 15, name: 'Dyson V15 Detect Absolute Cordless Vacuum Cleaner', brand: 'Dyson', category: 'Home & Kitchen', price: 549, original: 749, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop', rating: 4.6, reviews: 14820, badge: 'deal', prime: true, stock: 'in_stock', discount: 27 },
  { id: 16, name: 'Vitamix 5200 Blender Professional-Grade Self-Cleaning', brand: 'Vitamix', category: 'Home & Kitchen', price: 399, original: 549, image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&h=400&fit=crop', rating: 4.8, reviews: 21045, badge: null, prime: true, stock: 'in_stock', discount: 27 },
  { id: 17, name: 'IKEA KALLAX Shelf Unit Room Divider White 77x77cm', brand: 'IKEA', category: 'Home & Kitchen', price: 119, original: 139, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop', rating: 4.5, reviews: 6823, badge: null, prime: false, stock: 'in_stock', discount: 14 },
  { id: 18, name: 'Nespresso Vertuo Plus Deluxe Coffee Espresso Machine', brand: 'Nespresso', category: 'Home & Kitchen', price: 149, original: 199, image: 'https://images.unsplash.com/photo-1459755486867-b55449bb39ff?w=400&h=400&fit=crop', rating: 4.6, reviews: 9312, badge: 'prime', prime: true, stock: 'low_stock', discount: 25 },

  // Books
  { id: 19, name: 'Atomic Habits: An Easy & Proven Way to Build Good Habits', brand: 'Avery', category: 'Books', price: 15, original: 27, image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop', rating: 4.9, reviews: 89043, badge: 'deal', prime: true, stock: 'in_stock', discount: 44 },
  { id: 20, name: 'The Psychology of Money: Timeless Lessons on Wealth', brand: 'Harriman House', category: 'Books', price: 12, original: 20, image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop', rating: 4.8, reviews: 54102, badge: 'sale', prime: true, stock: 'in_stock', discount: 40 },
  { id: 21, name: 'Deep Work: Rules for Focused Success in a Distracted World', brand: 'Grand Central', category: 'Books', price: 14, original: 22, image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=400&fit=crop', rating: 4.7, reviews: 32891, badge: null, prime: true, stock: 'in_stock', discount: 36 },

  // Sports
  { id: 22, name: 'Fitbit Charge 6 Advanced Fitness & Health Tracker GPS', brand: 'Fitbit', category: 'Sports', price: 159, original: 199, image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=400&fit=crop', rating: 4.5, reviews: 12309, badge: 'new', prime: true, stock: 'in_stock', discount: 20 },
  { id: 23, name: 'Manduka PRO Yoga Mat 6mm Thick Non-Slip Premium', brand: 'Manduka', category: 'Sports', price: 89, original: 120, image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop', rating: 4.7, reviews: 8720, badge: null, prime: true, stock: 'in_stock', discount: 26 },
  { id: 24, name: 'Bowflex SelectTech 552 Adjustable Dumbbells Pair', brand: 'Bowflex', category: 'Sports', price: 429, original: 549, image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop', rating: 4.8, reviews: 7041, badge: 'deal', prime: true, stock: 'low_stock', discount: 22 },
]

const CATEGORIES = [
  { name: 'All', emoji: '🏠', count: ALL_PRODUCTS.length },
  { name: 'Electronics', emoji: '📱', count: ALL_PRODUCTS.filter(p => p.category === 'Electronics').length },
  { name: 'Fashion', emoji: '👗', count: ALL_PRODUCTS.filter(p => p.category === 'Fashion').length },
  { name: 'Home & Kitchen', emoji: '🏡', count: ALL_PRODUCTS.filter(p => p.category === 'Home & Kitchen').length },
  { name: 'Books', emoji: '📚', count: ALL_PRODUCTS.filter(p => p.category === 'Books').length },
  { name: 'Sports', emoji: '🏋️', count: ALL_PRODUCTS.filter(p => p.category === 'Sports').length },
]

const HERO_SLIDES = [
  { gradient: 'linear-gradient(135deg, #131921 0%, #232F3E 40%, #1a3a5c 100%)', badge: '🔥 Hot Deals Today', title: 'Tech Deals Up to 40% Off', sub: 'Laptops, headphones, cameras & more — best prices guaranteed', cta: 'Shop Electronics' },
  { gradient: 'linear-gradient(135deg, #0d1117 0%, #1a1a2e 40%, #16213e 100%)', badge: '⚡ Limited Time', title: 'Fashion Season Sale', sub: 'Top brands at incredible prices — style that speaks for itself', cta: 'Shop Fashion' },
  { gradient: 'linear-gradient(135deg, #1a0a00 0%, #3d1c00 40%, #5d2e0c 100%)', badge: '🏠 Home Upgrade', title: 'Transform Your Home', sub: 'Premium kitchen & home appliances — cooking made effortless', cta: 'Shop Home' },
]

const DEALS_CATS = [
  { emoji: '📱', name: 'Electronics', discount: 'Up to 40%' },
  { emoji: '👗', name: 'Fashion', discount: 'Up to 60%' },
  { emoji: '🏡', name: 'Home', discount: 'Up to 35%' },
  { emoji: '📚', name: 'Books', discount: 'Up to 50%' },
]

// ── Helpers ───────────────────────────────────────────────────────────────────
function renderStars(rating) {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5 ? 1 : 0
  const empty = 5 - full - half
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty)
}

function formatPrice(price) {
  return price.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })
}

// ── Components ─────────────────────────────────────────────────────────────────
function Toast({ toasts }) {
  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className="toast">
          <span className="toast-icon">{t.icon}</span>
          {t.msg}
        </div>
      ))}
    </div>
  )
}

function ProductCard({ product, listView, onAddCart, onWishlist, wishlisted }) {
  const { name, brand, price, original, image, rating, reviews, badge, prime, stock, discount } = product

  const stockLabel = stock === 'in_stock' ? 'In Stock' : stock === 'low_stock' ? 'Only 3 left in stock!' : 'Out of Stock'
  const stockClass = stock === 'in_stock' ? 'in-stock' : stock === 'low_stock' ? 'low-stock' : 'out-of-stock'

  return (
    <div className={`product-card${listView ? ' list-card' : ''}`} id={`product-${product.id}`}>
      <div className="card-image-wrap">
        <img src={image} alt={name} className="card-img" loading="lazy" />
        <div className="card-badges">
          {badge === 'deal' && <span className="badge badge-deal">Deal</span>}
          {badge === 'new' && <span className="badge badge-new">New</span>}
          {badge === 'prime' && <span className="badge badge-prime">Prime</span>}
          {badge === 'sale' && <span className="badge badge-sale">Sale</span>}
        </div>
        <button
          className={`wishlist-btn${wishlisted ? ' wishlisted' : ''}`}
          onClick={() => onWishlist(product.id)}
          title="Add to Wishlist"
          id={`wishlist-btn-${product.id}`}
        >
          {wishlisted ? '❤️' : '🤍'}
        </button>
      </div>

      <div className="card-body">
        <div className="product-brand">{brand}</div>
        <div className="product-name">{name}</div>

        <div className="product-rating">
          <span className="rating-stars">{renderStars(rating)}</span>
          <span className="rating-count">{reviews.toLocaleString()}</span>
        </div>

        <div className="product-pricing">
          <div className="price-row">
            <span className="price-current">
              <span className="price-currency">$</span>
              {price.toFixed(0)}
            </span>
            {original > price && (
              <>
                <span className="price-original">{formatPrice(original)}</span>
                <span className="price-discount">-{discount}%</span>
              </>
            )}
          </div>
        </div>

        {prime && (
          <div className="prime-badge">
            <span className="prime-icon">⚡</span>
            <span className="prime-text">prime</span>
            <span className="free-delivery">FREE Delivery</span>
          </div>
        )}

        <div className="stock-status">
          <span className={stockClass}>{stockLabel}</span>
        </div>

        <div className="card-actions">
          <button
            className="btn-add-cart"
            onClick={() => onAddCart(product)}
            disabled={stock === 'out_of_stock'}
            id={`add-cart-${product.id}`}
          >
            🛒 Add to Cart
          </button>
          <button className="btn-buy-now" id={`buy-now-${product.id}`}>
            ⚡ Buy Now
          </button>
        </div>
      </div>
    </div>
  )
}

function CartDrawer({ open, onClose, cart, onQty, onRemove }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <>
      <div className={`cart-overlay${open ? ' open' : ''}`} onClick={onClose} />
      <div className={`cart-drawer${open ? ' open' : ''}`} id="cart-drawer">
        <div className="cart-header">
          <h3>🛒 Shopping Cart ({cart.reduce((s, i) => s + i.qty, 0)})</h3>
          <button className="cart-close" onClick={onClose} id="cart-close-btn">✕</button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-icon">🛒</div>
            <p>Your cart is empty</p>
            <span>Add items to get started!</span>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-info">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-price">{formatPrice(item.price * item.qty)}</div>
                    <div className="qty-control">
                      <button className="qty-btn" onClick={() => onQty(item.id, -1)}>−</button>
                      <span className="qty-num">{item.qty}</span>
                      <button className="qty-btn" onClick={() => onQty(item.id, 1)}>+</button>
                    </div>
                  </div>
                  <button className="remove-item-btn" onClick={() => onRemove(item.id)}>✕</button>
                </div>
              ))}
            </div>
            <div className="cart-footer">
              <div className="cart-subtotal">
                <span className="subtotal-label">Subtotal ({cart.reduce((s, i) => s + i.qty, 0)} items):</span>
                <span className="subtotal-amount">{formatPrice(total)}</span>
              </div>
              <button className="checkout-btn" id="checkout-btn">Proceed to Checkout →</button>
            </div>
          </>
        )}
      </div>
    </>
  )
}

// ── Main App ──────────────────────────────────────────────────────────────────
function App() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('featured')
  const [searchQuery, setSearchQuery] = useState('')
  const [listView, setListView] = useState(false)
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [wishlist, setWishlist] = useState(new Set())
  const [toasts, setToasts] = useState([])
  const [heroSlide, setHeroSlide] = useState(0)
  const [loading, setLoading] = useState(true)

  // Simulate loading
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200)
    return () => clearTimeout(t)
  }, [])

  // Hero auto-slide
  useEffect(() => {
    const interval = setInterval(() => setHeroSlide(s => (s + 1) % HERO_SLIDES.length), 5000)
    return () => clearInterval(interval)
  }, [])

  const showToast = useCallback((msg, icon = '✅') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, msg, icon }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000)
  }, [])

  const addToCart = useCallback((product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      }
      return [...prev, { ...product, qty: 1 }]
    })
    showToast(`"${product.name.slice(0, 40)}…" added to cart!`, '🛒')
  }, [showToast])

  const updateQty = useCallback((id, delta) => {
    setCart(prev => {
      const updated = prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
      return updated
    })
  }, [])

  const removeFromCart = useCallback((id) => {
    setCart(prev => prev.filter(i => i.id !== id))
    showToast('Item removed from cart', '🗑️')
  }, [showToast])

  const toggleWishlist = useCallback((id) => {
    setWishlist(prev => {
      const next = new Set(prev)
      if (next.has(id)) { next.delete(id); showToast('Removed from wishlist', '💔') }
      else { next.add(id); showToast('Added to wishlist!', '❤️') }
      return next
    })
  }, [showToast])

  // Filter + sort
  const filteredProducts = ALL_PRODUCTS
    .filter(p => {
      const matchCat = selectedCategory === 'All' || p.category === selectedCategory
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.brand.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCat && matchSearch
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price
      if (sortBy === 'price-high') return b.price - a.price
      if (sortBy === 'rating') return b.rating - a.rating
      if (sortBy === 'reviews') return b.reviews - a.reviews
      if (sortBy === 'discount') return b.discount - a.discount
      return 0
    })

  const cartCount = cart.reduce((s, i) => s + i.qty, 0)
  const slide = HERO_SLIDES[heroSlide]

  return (
    <div id="amazon-app">
      {/* ── HEADER ── */}
      <header className="header" id="main-header">
        <div className="header-top">
          {/* Logo */}
          <div className="logo" onClick={() => { setSelectedCategory('All'); setSearchQuery('') }}>
            ShopNow<span>Prime Store</span>
          </div>

          {/* Location */}
          <div className="location-btn">
            <span className="loc-label">📍 Deliver to</span>
            <span className="loc-city">India</span>
          </div>

          {/* Search */}
          <div className="search-bar">
            <select className="search-category" id="search-category-select">
              <option>All</option>
              {CATEGORIES.slice(1).map(c => <option key={c.name}>{c.name}</option>)}
            </select>
            <input
              className="search-input"
              id="search-input"
              type="text"
              placeholder="Search products, brands and more…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <button className="search-btn" id="search-btn">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
            </button>
          </div>

          {/* Account */}
          <button className="header-btn" id="account-btn">
            <span className="btn-label">Hello, Sign in</span>
            <span className="btn-title">Account & Lists ▾</span>
          </button>

          {/* Orders */}
          <button className="header-btn" id="orders-btn">
            <span className="btn-label">Returns</span>
            <span className="btn-title">& Orders</span>
          </button>

          {/* Cart */}
          <button className="cart-btn" onClick={() => setCartOpen(true)} id="cart-btn">
            <div style={{ position: 'relative' }}>
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293A1 1 0 0 0 5 17h12M16 21a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm-9 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
              </svg>
              {cartCount > 0 && (
                <span className="cart-count" style={{ position: 'absolute', top: -8, right: -8, minWidth: 20, height: 20, fontSize: 12 }}>{cartCount}</span>
              )}
            </div>
            <span className="btn-title">Cart</span>
          </button>
        </div>

        {/* Nav links */}
        <nav className="header-nav" id="main-nav">
          {['All Departments', 'Today\'s Deals', 'Electronics', 'Fashion', 'Home & Kitchen', 'Books', 'Sports & Outdoors', 'Beauty', 'Toys', 'Automotive', 'Gift Cards'].map(link => (
            <button key={link} className={`nav-link${link === 'Today\'s Deals' ? ' active' : ''}`}>
              {link}
            </button>
          ))}
        </nav>
      </header>

      {/* ── ANNOUNCEMENT ── */}
      <div className="announcement-bar">
        🎉 FREE delivery on orders over $35 — Prime members get FREE same-day delivery!
        <span>Join Prime →</span>
      </div>

      {/* ── HERO BANNER ── */}
      <section className="hero-banner" id="hero-banner">
        <div className="hero-slide">
          <div className="hero-gradient" style={{ background: slide.gradient }} />
          <div className="hero-content">
            <div className="hero-badge">{slide.badge}</div>
            <h1 className="hero-title">{slide.title}</h1>
            <p className="hero-sub">{slide.sub}</p>
            <button className="hero-cta" onClick={() => setSelectedCategory(slide.cta.includes('Electronics') ? 'Electronics' : slide.cta.includes('Fashion') ? 'Fashion' : 'Home & Kitchen')}>
              {slide.cta} →
            </button>
          </div>
          <div className="hero-dots">
            {HERO_SLIDES.map((_, i) => (
              <button key={i} className={`hero-dot${i === heroSlide ? ' active' : ''}`} onClick={() => setHeroSlide(i)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── MAIN ── */}
      <div className="main-container">
        {/* Sidebar */}
        <aside className="sidebar" id="sidebar">
          <div className="sidebar-section">
            <div className="sidebar-title">Department</div>
            <ul className="category-list">
              {CATEGORIES.map(c => (
                <li
                  key={c.name}
                  className={selectedCategory === c.name ? 'active' : ''}
                  onClick={() => setSelectedCategory(c.name)}
                  id={`sidebar-cat-${c.name.replace(/\s/g, '-')}`}
                >
                  <span>{c.emoji}</span>
                  {c.name}
                  <span className="cat-count">{c.count}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="sidebar-section">
            <div className="sidebar-title">Price Range</div>
            <div className="price-inputs">
              <input className="price-input" placeholder="Min $" type="number" id="price-min" />
              <span>–</span>
              <input className="price-input" placeholder="Max $" type="number" id="price-max" />
              <button className="price-go-btn">Go</button>
            </div>
          </div>

          <div className="sidebar-section">
            <div className="sidebar-title">Avg. Customer Review</div>
            <ul className="rating-filter">
              {[4, 3, 2, 1].map(r => (
                <li key={r}>
                  <span className="stars">{'★'.repeat(r)}{'☆'.repeat(4 - r)}</span>
                  <span>& Up</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="sidebar-section">
            <div className="sidebar-title">Brand</div>
            <div className="brand-filter">
              {['Apple', 'Samsung', 'Sony', 'Nike', 'Dyson', 'Instant Pot'].map(b => (
                <label key={b}>
                  <input type="checkbox" id={`brand-${b}`} />
                  {b}
                </label>
              ))}
            </div>
          </div>

          <div className="sidebar-section">
            <div className="sidebar-title">Features</div>
            <div className="brand-filter">
              {['Prime Eligible', 'Free Shipping', 'New Arrivals', 'On Sale', 'Top Rated'].map(f => (
                <label key={f}>
                  <input type="checkbox" id={`feature-${f.replace(/\s/g, '-')}`} />
                  {f}
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Catalog Main */}
        <main className="catalog-main" id="catalog-main">
          {/* Deals Strip */}
          <section className="deals-strip" id="deals-strip">
            <div className="section-header" style={{ marginTop: 0, marginBottom: 14 }}>
              <div className="section-title">Today's Deals</div>
              <button className="see-all-btn">See all deals</button>
            </div>
            <div className="deals-grid">
              {DEALS_CATS.map(d => (
                <div className="deal-card" key={d.name} onClick={() => setSelectedCategory(d.name === 'Home' ? 'Home & Kitchen' : d.name)}>
                  <div className="deal-emoji">{d.emoji}</div>
                  <div className="deal-cat-name">{d.name}</div>
                  <div className="deal-discount">{d.discount}</div>
                  <div className="deal-off">off</div>
                </div>
              ))}
            </div>
          </section>

          {/* Category pills */}
          <div className="category-pills" id="category-pills">
            {CATEGORIES.map(c => (
              <button
                key={c.name}
                className={`pill${selectedCategory === c.name ? ' active' : ''}`}
                onClick={() => setSelectedCategory(c.name)}
                id={`pill-${c.name.replace(/\s/g, '-')}`}
              >
                <span className="pill-emoji">{c.emoji}</span>
                {c.name}
              </button>
            ))}
          </div>

          {/* Toolbar */}
          <div className="catalog-toolbar" id="catalog-toolbar">
            <div className="result-count">
              {searchQuery
                ? <><strong>{filteredProducts.length}</strong> results for "<strong>{searchQuery}</strong>"</>
                : <><strong>{filteredProducts.length}</strong> products in <strong>{selectedCategory}</strong></>}
            </div>
            <div className="toolbar-right">
              <select className="sort-select" id="sort-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option value="featured">Sort: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Avg. Customer Review</option>
                <option value="reviews">Most Reviewed</option>
                <option value="discount">Biggest Discount</option>
              </select>
              <div className="view-toggles">
                <button className={`view-btn${!listView ? ' active' : ''}`} onClick={() => setListView(false)} title="Grid view" id="grid-view-btn">⊞</button>
                <button className={`view-btn${listView ? ' active' : ''}`} onClick={() => setListView(true)} title="List view" id="list-view-btn">☰</button>
              </div>
            </div>
          </div>

          {/* Products */}
          <section id="products-section">
            <div className="section-header">
              <div className="section-title">
                {selectedCategory === 'All' ? '🔥 Best Sellers' : `${CATEGORIES.find(c => c.name === selectedCategory)?.emoji} ${selectedCategory}`}
              </div>
              <button className="see-all-btn">See all</button>
            </div>

            {loading ? (
              <div className={`products-grid${listView ? ' list-view' : ''}`}>
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="shimmer-card">
                    <div className="shimmer shimmer-img" />
                    <div className="shimmer shimmer-line medium" />
                    <div className="shimmer shimmer-line short" />
                    <div className="shimmer shimmer-line medium" />
                    <div className="shimmer shimmer-btn" />
                    <div className="shimmer shimmer-btn" />
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 20px', color: '#555' }}>
                <div style={{ fontSize: 64, marginBottom: 16 }}>🔍</div>
                <h2 style={{ fontSize: 20, color: '#333', marginBottom: 8 }}>No results for "{searchQuery}"</h2>
                <p>Try different keywords or browse our categories</p>
                <button className="btn-add-cart" style={{ display: 'inline-block', marginTop: 20, width: 'auto', padding: '10px 24px' }} onClick={() => { setSearchQuery(''); setSelectedCategory('All') }}>
                  Clear filters
                </button>
              </div>
            ) : (
              <div className={`products-grid${listView ? ' list-view' : ''}`} id="products-grid">
                {filteredProducts.map(p => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    listView={listView}
                    onAddCart={addToCart}
                    onWishlist={toggleWishlist}
                    wishlisted={wishlist.has(p.id)}
                  />
                ))}
              </div>
            )}
          </section>
        </main>
      </div>

      {/* ── FOOTER ── */}
      <footer className="footer" id="main-footer">
        <div className="footer-top">
          <div className="footer-col">
            <div className="footer-logo">ShopNow<span>.</span></div>
            <p style={{ fontSize: 12, color: '#888', marginTop: 8, lineHeight: 1.6 }}>Your one-stop shop for everything you love. Quality products, unbeatable prices.</p>
          </div>
          <div className="footer-col">
            <h4>Get to Know Us</h4>
            <ul>
              {['About Us', 'Careers', 'Press Releases', 'ShopNow Cares', 'Gift Ideas'].map(l => <li key={l}><a href="#">{l}</a></li>)}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Make Money with Us</h4>
            <ul>
              {['Sell Products', 'Sell on ShopNow', 'Become an Affiliate', 'Advertise', 'Self-Publish'].map(l => <li key={l}><a href="#">{l}</a></li>)}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Let Us Help You</h4>
            <ul>
              {['Your Account', 'Your Orders', 'Shipping Rates', 'Returns & Replacements', 'Help'].map(l => <li key={l}><a href="#">{l}</a></li>)}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          © 2024 ShopNow, Inc. · All rights reserved · Privacy Policy · Terms of Use · Interest-Based Ads
        </div>
      </footer>

      {/* ── CART DRAWER ── */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} onQty={updateQty} onRemove={removeFromCart} />

      {/* ── TOASTS ── */}
      <Toast toasts={toasts} />
    </div>
  )
}

export default App
