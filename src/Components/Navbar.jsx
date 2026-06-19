function Navbar({ onAddProduct }) {
  return (
    <header className="navbar">
      <div className="navbar-brand">TechnoHub</div>

      <div className="navbar-search">
        <input
          type="search"
          placeholder="Search products..."
          className="search-input"
        />
      </div>

      <nav className="nav-links">
        <a href="#">Home</a>
        <a href="#">Features</a>
        <a href="#">Pricing</a>
        
      </nav>
    </header>
  )
}

export default Navbar
