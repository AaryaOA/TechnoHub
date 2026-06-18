import { useState } from 'react'

function Navbar() {
  const [search, setSearch] = useState('')

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="navbar-brand">TechnoHub</span>
      </div>

      <div className="navbar-center">
        <label className="navbar-search" htmlFor="product-search">
          <input
            id="product-search"
            className="search-input"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products…"
            aria-label="Search products"
          />
        </label>
      </div>

      <div className="navbar-right">
        <button type="button" className="nav-link">
          Features
        </button>
        <button type="button" className="nav-link">
          Pricing
        </button>
        <button type="button" className="nav-link">
          Contact
        </button>
      </div>
    </nav>
  )
}

export default Navbar
