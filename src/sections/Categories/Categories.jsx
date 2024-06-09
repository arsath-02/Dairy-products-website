import React from 'react';
import './Categories.css';
import milkImage from '../../assets/milk.jpeg';
import yogurtImage from '../../assets/yogurt.jpeg';
import cheeseImage from '../../assets/cheese.jpeg';
import butterImage from '../../assets/butter.jpeg';
import GheeImage from '../../assets/ghee.jpeg';

const categories = [
  { name: 'Milk', image: milkImage },
  { name: 'Yogurt', image: yogurtImage },
  { name: 'Cheese', image: cheeseImage },
  { name: 'Butter', image: butterImage },
  { name: 'Ghee', image: GheeImage }
];

export const Categories = () => {
  return (
    <section>
      <div id="categories">Categories</div>
      <div className="categories-container">
        {categories.map((category, index) => (
          <div key={index} className="category-card">
            <img src={category.image} alt={category.name} className="category-image" />
            <div className="category-name">{category.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;
