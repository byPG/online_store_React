import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

function CartPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
  } = useContext(CartContext);

  if (cartItems.length === 0) {
    return (
      <main className="cart-page">
        <h1>Your cart</h1>

        <div className="cart-empty">
          <p>Your cart is empty</p>
          <p className="cart-empty-sub">
            Looks like you haven’t added anything yet.
          </p>

          <Link to="/products" className="cart-empty-button">
            Browse products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      <h1>Your cart</h1>

      <section className="cart-layout">
        <div className="cart-items">
          {cartItems.map((item) => (
            <article className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div className="cart-item-info">
                <h2>{item.name}</h2>
                <p>{item.category}</p>
                <p>{item.price} zł</p>
              </div>

              <div className="cart-item-actions">
                <div className="quantity-box">
                  <button
                    type="button"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    type="button"
                    onClick={() => increaseQuantity(item.id)}
                  >
                    +
                  </button>
                </div>

                <button
                  className="remove-button"
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>

        <aside className="cart-summary">
          <h2>Order summary</h2>

          <div className="cart-summary-row">
            <span>Total</span>
            <strong>{totalPrice.toFixed(2)} zł</strong>
          </div>

          <button type="button" className="checkout-button">
            Checkout
          </button>

          <form className="checkout-form">
            <h2>Checkout</h2>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />

            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
            />

            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={formData.postalCode}
              onChange={handleChange}
            />

            <button type="submit" className="checkout-button">
              Place Order
            </button>
          </form>
        </aside>
      </section>
    </main>
  );
}

export default CartPage;
