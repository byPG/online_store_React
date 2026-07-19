import { Link, useLocation } from "react-router-dom";

function ThankYouPage() {
  const location = useLocation();
  const checkoutType = location.state?.checkoutType;
  const isGuestOrder = checkoutType === "guest";

  return (
    <main>
      <section className="thank-you-page">
        <h1>Thank you for your order!</h1>
        <p>Your order has been placed successfully.</p>

        <div className="thank-you-actions">
          <Link to="/products" className="cart-empty-button">
            Continue shopping
          </Link>

          {isGuestOrder ? (
            <Link to="/register" className="thank-you-secondary-button">
              Create account
            </Link>
          ) : (
            <Link to="/profile" className="thank-you-secondary-button">
              View order history
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}

export default ThankYouPage;
