import React from 'react';
import './Products.css';
import { productsData } from './Data';

export const Products = ({ addToCart }) => {
  return (
    <section id="products">
      <div className="products-container">
        <h2>Our Products</h2>
        <div className="products-list">
          {productsData.map((product) => (
            <div key={product.id} className="product-item">
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-details">
                <h3>{product.name}</h3>
                <p>{product.type}</p>
                <p>{product.description}</p>
                <p className="price">{product.price}</p>
                <div>
                  <button onClick={() => addToCart(product)} className="btn">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
