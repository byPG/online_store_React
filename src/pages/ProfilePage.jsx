import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getOrdersByUserId } from "../services/ordersService";

function ProfilePage() {
  const { currentUser, isAuthLoading } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);
  const [ordersError, setOrdersError] = useState("");

  useEffect(() => {
    async function loadOrders() {
      if (!currentUser) {
        setIsLoadingOrders(false);
        return;
      }

      try {
        setOrdersError("");
        setIsLoadingOrders(true);

        const userOrders = await getOrdersByUserId(currentUser.uid);

        setOrders(userOrders);
      } catch (firebaseError) {
        console.error("Orders loading error:", firebaseError);
        setOrdersError("Could not load your orders.");
      } finally {
        setIsLoadingOrders(false);
      }
    }

    loadOrders();
  }, [currentUser]);

  if (isAuthLoading) {
    return (
      <main className="profile-page">
        <p>Loading profile...</p>
      </main>
    );
  }

  if (!currentUser) {
    return (
      <main className="profile-page">
        <section className="profile-card">
          <p className="home-eyebrow">Customer profile</p>
          <h1>Please log in</h1>
          <p className="profile-text">
            Log in to view your account details and order history.
          </p>

          <Link to="/login" className="home-primary-button">
            Log in
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="profile-page">
      <section className="profile-card">
        <p className="home-eyebrow">Customer profile</p>

        <h1>My profile</h1>

        <p className="profile-text">
          You are logged in as <strong>{currentUser.email}</strong>.
        </p>
      </section>

      <section className="orders-section">
        <div className="orders-heading">
          <h2>Order history</h2>
          <p>Your recent Beauty Shop orders are listed below.</p>
        </div>

        {isLoadingOrders && <p>Loading orders...</p>}

        {ordersError && <p className="form-field-error">{ordersError}</p>}

        {!isLoadingOrders && !ordersError && orders.length === 0 && (
          <div className="orders-empty">
            <p>You have not placed any orders yet.</p>
            <Link to="/products" className="cart-empty-button">
              Browse products
            </Link>
          </div>
        )}

        <div className="orders-list">
          {orders.map((order) => {
            const orderDate = order.createdAt?.toDate
              ? order.createdAt.toDate().toLocaleDateString()
              : "Date unavailable";

            return (
              <article className="order-card" key={order.id}>
                <div className="order-card-header">
                  <div>
                    <h3>Order #{order.id.slice(0, 8)}</h3>
                    <p>{orderDate}</p>
                  </div>

                  <div className="order-total">
                    <span>Total:</span>
                    <strong>{order.totalPrice.toFixed(2)} zł</strong>
                  </div>
                </div>

                <div className="order-items">
                  {order.items.map((item) => (
                    <div className="order-item" key={`${order.id}-${item.id}`}>
                      <img src={item.image} alt={item.name} loading="lazy" />

                      <div>
                        <h4>{item.name}</h4>
                        <p>
                          {item.quantity} × {item.price} zł
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default ProfilePage;
