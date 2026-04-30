import { Link } from "react-router-dom";

function ThankYouPage() {
  return (
    <main>
      <section className="thank-you-page">
        <h1>Thank you for your order!</h1>
        <p>Your order has been placed successfully.</p>

        <Link to="/products" className="cart-empty-button">
          Continue shopping
        </Link>
      </section>
    </main>
  );
}

export default ThankYouPage;
