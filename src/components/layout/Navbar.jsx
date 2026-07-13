import { Link } from "react-router-dom";
import { useContext } from "react"; //for using the context in the components
import { CartContext } from "../../context/CartContext";
import { FavouritesContext } from "../../context/FavouritesContext";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {
  const { totalItems } = useContext(CartContext);
  const { totalFavouritesItems } = useContext(FavouritesContext);
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <header>
      <nav>
        <Link to="/" className="nav-logo" aria-label="Beauty Shop home">
          <span className="nav-logo-mark">B</span>

          <span className="nav-logo-text">
            <span>Beauty</span>
            <strong>Shop</strong>
          </span>
        </Link>

        <div>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/favourites" className="favourites-link">
            <span className="favourites-icon">♡</span>
            <span>Favourites</span>
            {totalFavouritesItems > 0 && (
              <span className="favourites-badge">{totalFavouritesItems}</span>
            )}
          </Link>
          <Link to="/cart" className="cart-link">
            <span className="cart-icon">🛒</span>
            <span>Cart</span>
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>
          {currentUser ? (
            <>
              <Link to="/profile" className="nav-profile-link">
                <span className="nav-profile-icon">👤</span>
                <span>Your Profile</span>
              </Link>

              <button
                className="nav-auth-button"
                type="button"
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
