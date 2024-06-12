import React from 'react';
import './Deal.css';
import delivery from '../../assets/delivery.jpeg';
import cheese1 from '../../assets/cheese1.jpeg';
import one from '../../assets/one+one.png';
const deals = [
  {
    id: 1,
    title: 'Buy One Get One Free',
    description: 'Get two products for the price of one!',
    image: one
  },
  {
    id: 2,
    title: '20% Off on All Cheeses',
    description: 'Enjoy a discount on all cheese products.',
    image: cheese1
  },
  {
    id: 3,
    title: 'Free Delivery',
    description: 'Free delivery on orders over $50.',
    image: delivery
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
