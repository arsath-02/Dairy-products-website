import React, { useState } from 'react';
import './Cart.css';

const Cart = ({ cart, removeFromCart, totalPrice, clearCart }) => {
  const [itemsToBuy, setItemsToBuy] = useState(new Set()); // Use a Set to store item IDs to buy
  const [buyMessage, setBuyMessage] = useState('');
  
  const handleToggleBuy = (index) => {
    const itemId = cart[index]._id; // Assuming cart items have unique _id property
    if (itemsToBuy.has(itemId)) {
      // Item is already marked to buy, remove it
      const updatedSet = new Set(itemsToBuy);
      updatedSet.delete(itemId);
      setItemsToBuy(updatedSet);
    } else {
      // Item is not marked to buy, add it
      setItemsToBuy(new Set(itemsToBuy).add(itemId));
    }
  };

  const handleBuyNowClick = () => {
    // Logic to handle buying items in itemsToBuy set
    console.log('Items to buy:', itemsToBuy);
    setBuyMessage('Your order has been placed. Products will reach you soon.');
    clearCart(); // Clear the cart
    setItemsToBuy(new Set()); // Clear itemsToBuy state
  };

  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={item._id} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <span className="cart-item-name">{item.name}</span>
              <span className="cart-item-quantity">Quantity: {item.quantity}</span>
              <span className="cart-item-price">
                ${(parseFloat(item.price.replace(/[^0-9.-]+/g, '')) * item.quantity).toFixed(2)}
              </span>
            </div>
            <button
              onClick={() => removeFromCart(index)}
              className="cart-item-remove"
            >
              Remove
            </button>
            <input
              type="checkbox"
              checked={itemsToBuy.has(item._id)}
              onChange={() => handleToggleBuy(index)}
              className="cart-item-buy-checkbox"
            />
          </li>
        ))}
      </ul>
      <h3>Total: ${totalPrice(cart).toFixed(2)}</h3>
      <button onClick={handleBuyNowClick} className="btn-buy-now">
        Buy Now
      </button>
      {buyMessage && <p className="buy-message">{buyMessage}</p>}
    </div>
  );
};

export default Cart;
