import React, { useState } from 'react';
import './Products.css';
import { productsData } from './Data'; // Assuming you have product data

const Products = ({ products, addToCart, toggleFavorite, favorites }) => {
  const [quantities, setQuantities] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  // Function to handle quantity change
  const handleQuantityChange = (productId, quantity) => {
    setQuantities({ ...quantities, [productId]: quantity });
  };

  // Function to handle adding to cart
  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 1; // Default quantity is 1 if not selected
    addToCart({ ...product, quantity });
    setQuantities({ ...quantities, [product.id]: undefined }); // Clear quantity after adding to cart
  };

  // Function to handle search input change
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to clear search query
  const clearSearchQuery = () => {
    setSearchQuery('');
  };

  // Function to filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  return (
    <section id="products">
      <div className="products-container">
        <h2>Our Products</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          {searchQuery && ( 
            <button className="clear-button" onClick={clearSearchQuery}>
              &#x2715; {}
            </button>
          )}
        </div>
        <div className="products-list">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="product-item">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-details">
                  <h3>{product.name}</h3>
                  <p>{product.type}</p>
                  <p>{product.description}</p>
                  <p className="price">${product.price}</p>
                  <div className="product-actions">
                    <div className="quantity-favorite">
                      <div className="quantity-dropdown">
                        <select
                          value={quantities[product.id] || 1}
                          onChange={(e) =>
                            handleQuantityChange(product.id, parseInt(e.target.value))
                          }
                        >
                          {[1, 2, 3, 4, 5].map((number) => (
                            <option key={number} value={number}>
                              {number}
                            </option>
                          ))}
                        </select>
                      </div>
                      <span
                        className={`favorite-icon ${
                          favorites.some((fav) => fav.id === product.id) ? 'favorited' : ''
                        }`}
                        onClick={() => toggleFavorite(product)}
                      >
                        &#9733;
                      </span>
                    </div>
                    <button onClick={() => handleAddToCart(product)} className="btn">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Products;
