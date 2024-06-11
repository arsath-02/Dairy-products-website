import React from 'react';
import './Deal.css';

const deals = [
  {
    id: 1,
    title: 'Buy One Get One Free',
    description: 'Get two products for the price of one!',
    image: 'path/to/deal1.jpg'
  },
  {
    id: 2,
    title: '20% Off on All Cheeses',
    description: 'Enjoy a discount on all cheese products.',
    image: 'path/to/deal2.jpg'
  },
  {
    id: 3,
    title: 'Free Delivery',
    description: 'Free delivery on orders over $50.',
    image: 'path/to/deal3.jpg'
  },
 
];

export const Deal = () => {
  return (
    <section id="deal">
      <div className="deal-container">
        <h2>Special Deals</h2>
        <div className="deal-grid">
          {deals.map((deal) => (
            <div key={deal.id} className="deal-card">
              <img src={deal.image} alt={deal.title} className="deal-image" />
              <h3>{deal.title}</h3>
              <p>{deal.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Deal;
