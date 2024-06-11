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

export const App = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const totalPrice = cart.reduce((total, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
    return total + price;
  }, 0);

  return (
    <Router>
      <main>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Header />
              <Categories />
              <Shop addToCart={addToCart} />
              <Products addToCart={addToCart} />
              <Deal />
              <Footer />
            </>
          } />
          <Route path="/categories" element={<Categories />} />
          <Route path="/shop" element={<Shop addToCart={addToCart} />} />
          <Route path="/products" element={<Products addToCart={addToCart} />} />
          <Route path="/deal" element={<Deal />} />
          <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} totalPrice={totalPrice} />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
