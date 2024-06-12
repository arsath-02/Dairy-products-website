import React from 'react';
import './Categories.css';
import milkImage from '../../assets/milk.jpeg';
import milkpouch from '../../assets/data2.jpeg';
import data7 from '../../assets/data7.jpeg';
import data8 from '../../assets/data8.jpeg';
import data11 from '../../assets/data11.jpeg';
import data12 from '../../assets/data12.jpeg';
import data13 from '../../assets/data13.jpeg';
import data15 from '../../assets/data15.jpeg';
import data16 from '../../assets/data16.jpeg';
import data18 from '../../assets/data18.jpeg';
import data19 from '../../assets/data19.jpeg';
import data20 from '../../assets/data20.jpeg';
import data22 from '../../assets/data22.jpeg';
import data30 from '../../assets/data30.jpeg';
import data24 from '../../assets/data24.jpeg';
import yogurtImage from '../../assets/yogurt.jpeg'; // Add this line
import cheeseImage from '../../assets/cheese.jpeg'; // Add this line
import butterImage from '../../assets/butter.jpeg'; // Add this line
import GheeImage from '../../assets/ghee.jpeg'; // Add this line

const categories = [
  { name: 'Milk', image: milkImage },
  { name: 'Milk Pouch', image: milkpouch },
  { name: 'Milk Powder', image: data20 },
  { name: 'Yogurt', image: yogurtImage },
  { name: 'Cheese', image: cheeseImage },
  { name: 'Butter', image: butterImage },
  { name: 'Ghee', image: GheeImage },
  { name: 'Butter Milk', image: data18 },
  { name: 'Fresh Cream', image: data19 },
  { name: 'Paneer', image: data7 },
  { name: 'Paneer Powder', image: data8 },
  { name: 'Lactose', image: data11 },
  { name: 'Basundi', image: data12 },
  { name: 'Mithai Mate', image: data13 },
  { name: 'Peanut Butter', image: data15 },
  { name: 'Amul Kool', image: data16 },
  { name: 'Garlic Herbs', image: data22 },
  { name: 'Chocolates', image: data20 },
  { name: 'Ice Creams', image: data24 },
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
