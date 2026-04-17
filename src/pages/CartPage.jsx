import { useCart } from "../context/CartContext";

function CartPage() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalPrice,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <main>
        <h1>Your cart</h1>
        <p>Your cart is empty.</p>
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
        </aside>
      </section>
    </main>
  );
}

export default CartPage;
