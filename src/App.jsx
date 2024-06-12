import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './sections/navbar/Navbar';
import Header from './sections/Header/Header';
import Categories from './sections/Categories/Categories';
import Shop from './sections/Shop/Shop';
import Deal from './sections/Deal/Deal';
import Footer from './sections/Footer/Footer';
import Hero from './sections/Hero/Hero';
import Products from './sections/Products/Products';
import Cart from './sections/Cart/Cart';
import Contact from './sections/Contact/Contact';
import Favorites from './sections/Favourites/Favourites';
import Register from './sections/Register/Register';
import Login from './sections/Login/Login';

const App = () => {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const toggleFavorite = (product) => {
    if (favorites.some((fav) => fav.id === product.id)) {
      setFavorites(favorites.filter((fav) => fav.id !== product.id));
    } else {
      setFavorites([...favorites, product]);
    }
  };

  const removeFromFavorites = (productId) => {
    setFavorites(favorites.filter((product) => product.id !== productId));
  };

  const removeAllFavorites = () => {
    setFavorites([]);
  };

  const totalPrice = cart.reduce((total, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ''));
    return total + price;
  }, 0);

  const onFormSwitch = (formName) => {
    console.log('Switch to form:', formName);
  };

  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Header />
                <Deal />
                <Categories />
                <Shop addToCart={addToCart} />
                <Products
                  addToCart={addToCart}
                  toggleFavorite={toggleFavorite}
                  favorites={favorites}
                />
                <Footer />
              </>
            }
          />
          <Route path="/categories" element={<Categories />} />
          <Route path="/shop" element={<Shop addToCart={addToCart} />} />
          <Route
            path="/products"
            element={
              <Products
                addToCart={addToCart}
                toggleFavorite={toggleFavorite}
                favorites={favorites}
              />
            }
          />
          <Route path="/deal" element={<Deal />} />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                removeFromCart={removeFromCart}
                totalPrice={totalPrice}
              />
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/favorites"
            element={
              <Favorites
                favorites={favorites}
                addToCart={addToCart}
                removeFromFavorites={removeFromFavorites}
                removeAllFavorites={removeAllFavorites}
              />
            }
          />
          <Route path="/register" element={<Register onFormSwitch={onFormSwitch} />} />
          <Route path="/login" element={<Login onFormSwitch={onFormSwitch} />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
