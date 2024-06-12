import React from 'react';
import './Shop.css';
import product1 from '../../assets/product4.jpeg';
import product2 from '../../assets/product5.jpeg';
import product3 from '../../assets/product6.jpeg';
import product4 from '../../assets/butter.jpeg';
import product5 from '../../assets/ghee.jpeg';
import product6 from '../../assets/yogurt.jpeg';

export const Shop = ({ addToCart }) => {
  const products = [
    {
      id: 1,
      name: 'Cheese',
      description: 'Fresh and delicious cheese.',
      price: '$10.00',
      image: product1,
    },
    {
      id: 2,
      name: 'Rose Milk',
      description: 'Refreshing rose-flavored milk.',
      price: '$15.00',
      image: product2,
    },
    {
      id: 3,
      name: 'Paneer',
      description: 'Soft and fresh paneer.',
      price: '$20.00',
      image: product3,
    },
    {
      id: 4,
      name: 'Butter',
      description: 'Creamy and rich butter.',
      price: '$12.00',
      image: product4,
    },
    {
      id: 5,
      name: 'Ghee',
      description: 'Pure and aromatic ghee.',
      price: '$25.00',
      image: product5,
    },
    {
      id: 6,
      name: 'Yogurt',
      description: 'Thick and creamy yogurt.',
      price: '$8.00',
      image: product6,
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
