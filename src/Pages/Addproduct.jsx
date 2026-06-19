import { useState } from 'react'

const API_BASE_URL = 'https://sample-e-1.onrender.com'
const ADD_PRODUCT_URL = `${API_BASE_URL}/product/addProduct`

function Addproduct({ onNavigate }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    stock: '',
    category: '',
  })
  const [image, setImage] = useState(null)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (
      !formData.name ||
      !formData.price ||
      !formData.description ||
      !formData.stock ||
      !formData.category
    ) {
      setMessageType('error')
      setMessage('Please fill in all fields.')
      return
    }

    const payload = new FormData()
    payload.append('name', formData.name)
    payload.append('price', String(formData.price))
    payload.append('description', formData.description)
    payload.append('stock', String(formData.stock))
    payload.append('category', formData.category)

    if (image) {
      payload.append('image', image)
    }

    setLoading(true)
    setMessage('')

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(ADD_PRODUCT_URL, {
        method: 'POST',
        headers: token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {},
        body: payload,
      })

      const data = await response.json().catch(() => ({}))

      if (response.ok) {
        setMessageType('success')
        setMessage(data.message || 'Product added successfully.')
        setFormData({
          name: '',
          price: '',
          description: '',
          stock: '',
          category: '',
        })
        setImage(null)
      } else {
        setMessageType('error')
        setMessage(data.message || 'Failed to add product.')
      }
    } catch (error) {
      console.error(error)
      setMessageType('error')
      setMessage('Server error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="login-page add-product-page">
      <section className="login-card add-product-card">
        <div className="form-header-add">
          <div>
            <h1>Add Product</h1>
            <p className="subtitle">Fill in the product details and submit to save.</p>
          </div>

          {onNavigate && (
            <button
              type="button"
              className="back-to-home-btn"
              onClick={() => onNavigate('home')}
            >
              ← Back to Home
            </button>
          )}
        </div>

        <form className="login-form add-product-form" onSubmit={handleSubmit}>
          <label>
            Product Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
            />
          </label>

          <label>
            Price
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              min="0"
              required
            />
          </label>

          <label>
            Description
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              rows="4"
              className="add-product-textarea"
              required
            />
          </label>

          <div className="form-row">
            <label>
              Stock
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="Enter stock quantity"
                min="0"
                required
              />
            </label>

            <label>
              Category
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select category</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="books">Books</option>
                <option value="food">Food</option>
                <option value="other">Other</option>
              </select>
            </label>
          </div>

          <label className="file-input-wrapper">
            Choose Image
            <input
              type="file"
              accept="image/*"
              onChange={(event) => setImage(event.target.files?.[0] || null)}
            />
            <span className="file-input-label">
              {image ? image.name : 'No file chosen'}
            </span>
          </label>

          <button type="submit" disabled={loading}>
            {loading ? 'Adding Product...' : 'Add Product'}
          </button>
        </form>

        {message && (
          <p className={`login-message ${messageType}`}>
            {message}
          </p>
        )}
      </section>
    </main>
  )
}

export default Addproduct