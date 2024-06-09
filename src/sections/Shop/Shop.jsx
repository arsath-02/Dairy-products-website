import React from 'react';
import './Shop.css';
import product1 from '../../assets/product4.jpeg';
import product2 from '../../assets/product5.jpeg';
import product3 from '../../assets/product6.jpeg';

export const Shop = () => {
  const products = [
    {
      id: 1,
      name: 'Cheese',
      description: 'Description of Milky Product 1',
      price: '$10.00',
      image: product1,
    },
    {
      id: 2,
      name: 'Rose Milk',
      description: 'Description of Milky Product 2',
      price: '$15.00',
      image: product2,
    },
    {
      id: 3,
      name: 'Panner',
      description: 'Description of Milky Product 3',
      price: '$20.00',
      image: product3,
    },
  ];

  return (
    <section id="shop">
      <div className="shop-container">
        <h2>Shop Milky Products</h2>
        <h4>Our Special Products</h4>
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p className="price">{product.price}</p>
              <button className="btn" onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Shop;
