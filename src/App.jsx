import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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
import Profile from './sections/Profile/Profile'; // Import the Profile component
import { productsData } from './sections/Products/Data'; // Assuming you have product data

const App = () => {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (token) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const performSearch = () => {
    const lowerCaseQuery = searchQuery.toLowerCase().trim();
    if (lowerCaseQuery.length === 0) {
      setSearchResults([]);
    } else {
      const filteredProducts = productsData.filter((product) =>
        product.name.toLowerCase().includes(lowerCaseQuery)
      );
      setSearchResults(filteredProducts);
    }
  };

  const clearSearchResults = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex((item) => item.id === product.id);
      if (existingProductIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += quantity;
        return updatedCart;
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
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

  const totalPrice = (cart) => {
    return cart.reduce((total, item) => {
      const itemPrice = parseFloat(item.price.replace(/[^0-9.-]+/g, ''));
      return total + itemPrice * item.quantity;
    }, 0);
  };

  const onFormSwitch = (formName) => {
    console.log(`Switch to form: ${formName}`);
  };

  return (
    <Router>
      <Navbar 
        searchQuery={searchQuery}
        handleSearchInputChange={handleSearchInputChange}
        performSearch={performSearch}
        clearSearchResults={clearSearchResults}
        isAuthenticated={isAuthenticated} // Pass isAuthenticated to Navbar
      />
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
                  products={searchQuery.length === 0 ? productsData : searchResults}
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
                products={searchQuery.length === 0 ? productsData : searchResults}
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
              isAuthenticated ? (
                <Cart
                  cart={cart}
                  removeFromCart={removeFromCart}
                  totalPrice={totalPrice}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/favorites"
            element={
              isAuthenticated ? (
                <Favorites
                  favorites={favorites}
                  addToCart={addToCart}
                  removeFromFavorites={removeFromFavorites}
                  removeAllFavorites={removeAllFavorites}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/register"
            element={<Register onFormSwitch={onFormSwitch} />}
          />
          <Route
            path="/login"
            element={<Login onFormSwitch={onFormSwitch} onLogin={handleLogin} />}
          />
          <Route
            path="/profile"
            element={
              isAuthenticated ? (
                <Profile />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
