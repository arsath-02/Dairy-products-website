import React from 'react';
import './Cart.css';

const Cart = ({ cart, removeFromCart, totalPrice }) => {
  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            <span>{item.name} - ${parseFloat(item.price.replace(/[^0-9.-]+/g, "")).toFixed(2)}</span>
            <button onClick={() => removeFromCart(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <h3>Total: ${totalPrice.toFixed(2)}</h3>
    </div>
  );
}

export default Cart;
