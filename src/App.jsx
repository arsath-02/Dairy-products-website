import React from 'react'
import Navbar from './sections/navbar/Navbar';
import Header from './sections/Header/Header';
import Categories from './sections/Categories/Categories';
import Shop from './sections/Shop/Shop';
import Deal from './sections/Deal/Deal';
import Footer from './sections/Footer/Footer';
export const App = () => {
  return (
    <main>
      <Navbar />
      <Header />
      <Categories />
      <Shop />
      <Deal />
      <Footer />
</main>
  )
}
export default App;
