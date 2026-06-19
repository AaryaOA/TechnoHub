import Navbar from '../Components/Navbar.jsx'
import Footer from '../Components/Footer.jsx'
import Cards from '../Components/Cards.jsx'


function Home({ onNavigate }) {
  const scrollToProducts = () => {
    const grid = document.querySelector('.product-grid')
    if (grid) {
      grid.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="home-layout">
      <Navbar onNavigate={onNavigate} />

      <main className="home-page">
        <section className="hero-section">
          <p className="eyebrow">Tech Marketplace</p>
          <h1>Discover curated products and add new stock with one click.</h1>
          <p className="hero-text">
            Browse featured items, manage your inventory, and instantly add new
            products from the dashboard.
          </p>
          <div className="hero-buttons">
            <button type="button" className="nav-button" onClick={scrollToProducts}>
              Shop Products
            </button>
            <button type="button" className="nav-button add-product-nav" onClick={() => onNavigate?.('addproduct')}>
              Add Product
            </button>
          </div>
        </section>

        <section className="product-grid">
          <Cards />
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Home
