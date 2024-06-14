import React from 'react';
import './Cart.css';

const Cart = ({ cart, removeFromCart, totalPrice }) => {
  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index} className="cart-item">
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
          </li>
        ))}
      </ul>
      <h3>Total: ${totalPrice(cart).toFixed(2)}</h3>
    </div>
  );
};

export default Cart;
