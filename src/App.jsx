
import React, { useState } from 'react';

import Navbar from './sections/navbar/Navbar';
import Header from './sections/Header/Header';
import Categories from './sections/Categories/Categories';
import Shop from './sections/Shop/Shop';
import Deal from './sections/Deal/Deal';
import Footer from './sections/Footer/Footer';
import Hero from './sections/Hero/Hero';
import Products from './sections/Products/Products';
import { productsData } from './sections/Products/Data'; 

export const App = () => {
  
  return (
    <main>
      <Navbar />
      <Hero />
      <Header />
      <Categories />
      <Shop />
      <Products />
      <Deal />
      <Footer />
</main>
  )
}
export default App;
