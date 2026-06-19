
import { useEffect, useState } from 'react'

function Cards() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://sample-e-1.onrender.com/product/getproducts')
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch products')
        }

        const normalizedProducts = Array.isArray(data)
          ? data
          : Array.isArray(data?.value)
            ? data.value
            : []

        setProducts(normalizedProducts)
      } catch (err) {
        setError(err.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return <p className="loading-text">Loading products...</p>
  }

  if (error) {
    return <p className="error-text">{error}</p>
  }

  return (
    <>
      {products.map((product) => {
        const imageUrl = product.image?.startsWith('http')
          ? product.image
          : `https://sample-e-1.onrender.com/${product.image}`

        return (
          <article key={product._id} className="product-card">
            <img src={imageUrl} alt={product.name} className="product-image" />
            <p className="product-tag">{product.category}</p>
            <h2>{product.name}</h2>
            <p className="product-price">₹{product.price}</p>
            <p>{product.description}</p>
            <button className="popup-btn">Buy Now</button>
          </article>
        )
      })}
    </>
  )
}

export default Cards