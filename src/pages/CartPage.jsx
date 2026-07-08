import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { createOrder } from "../services/ordersService";

function CartPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [formErrors, setFormErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function validateForm() {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required.";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!formData.email.includes("@")) {
      errors.email = "Please enter a valid email address.";
    }

    if (!formData.address.trim()) {
      errors.address = "Address is required.";
    }

    if (!formData.city.trim()) {
      errors.city = "City is required.";
    }

    if (!formData.postalCode.trim()) {
      errors.postalCode = "Postal code is required.";
    }

    return errors;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setSubmitError("");
    setIsSubmitting(true);

    const orderData = {
      customer: {
        name: formData.name,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
      },
      items: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        category: item.category,
        brand: item.brand,
        size: item.size,
      })),
      totalItems: totalItems,
      totalPrice: totalPrice,
      status: "new",
    };

    try {
      await createOrder(orderData);

      setFormData({
        name: "",
        email: "",
        address: "",
        city: "",
        postalCode: "",
      });

      clearCart();
      navigate("/thank-you");
    } catch (firebaseError) {
      console.error("Order submit error:", firebaseError);
      setSubmitError("Could not place your order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
    clearCart,
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

          <form className="checkout-form" onSubmit={handleSubmit}>
            <h2>Checkout</h2>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />

            {formErrors.name && (
              <p className="form-field-error">{formErrors.name}</p>
            )}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />

            {formErrors.email && (
              <p className="form-field-error">{formErrors.email}</p>
            )}

            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
            />
            {formErrors.address && (
              <p className="form-field-error">{formErrors.address}</p>
            )}

            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
            />

            {formErrors.city && (
              <p className="form-field-error">{formErrors.city}</p>
            )}

            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={formData.postalCode}
              onChange={handleChange}
            />
            {formErrors.postalCode && (
              <p className="form-field-error">{formErrors.postalCode}</p>
            )}

            {submitError && <p className="form-field-error">{submitError}</p>}

            <button
              className="checkout-button"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Placing order..." : "Place Order"}
            </button>
          </form>
        </aside>
      </section>
    </main>
  );
}

export default CartPage;
