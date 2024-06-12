// Favorites.js

import React from 'react';
import './Favourites.css';

export const Favorites = ({ favorites, addToCart, removeFromFavorites, removeAllFavorites }) => {
  return (
    <section id="favorites">
      <div className="favorites-container">
        <h2>Favorite Products</h2>
        <div className="favorites-list">
          {favorites.length === 0 ? (
            <p>No favorite products yet.</p>
          ) : (
            favorites.map((product) => (
              <div key={product.id} className="favorite-item">
                <img src={product.image} alt={product.name} className="favorite-image" />
                <div className="favorite-details">
                  <h3>{product.name}</h3>
                  <p>{product.type}</p>
                  <p>{product.description}</p>
                  <p className="price">{product.price}</p>
                  <div>
                    <button onClick={() => addToCart(product)} className="btn">Add to Cart</button>
                    <button onClick={() => removeFromFavorites(product.id)} className="btn">Remove</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {favorites.length > 0 && (
          <button onClick={removeAllFavorites} className="btn">Remove All</button>
        )}
      </div>
    </section>
  );
};

export default Favorites;
