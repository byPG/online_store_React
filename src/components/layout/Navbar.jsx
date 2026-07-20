import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { FavouritesContext } from "../../context/FavouritesContext";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {
  const { totalItems } = useContext(CartContext);
  const { totalFavouritesItems } = useContext(FavouritesContext);
  const { currentUser, logout } = useContext(AuthContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function handleLogout() {
    logout();
    closeMenu();
  }

  return (
    <header>
      <nav>
        <Link
          to="/"
          className="nav-logo"
          aria-label="Beauty Shop home"
          onClick={closeMenu}
        >
          <span className="nav-logo-mark">B</span>

          <span className="nav-logo-text">
            <span>Beauty</span>
            <strong>Shop</strong>
          </span>
        </Link>

        <button
          className="nav-toggle"
          type="button"
          onClick={() => setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          <span className="nav-toggle-line"></span>
          <span className="nav-toggle-line"></span>
          <span className="nav-toggle-line"></span>
        </button>

        <div className={`nav-menu ${isMenuOpen ? "nav-menu-open" : ""}`}>
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>

          <Link to="/products" onClick={closeMenu}>
            Products
          </Link>

          <Link
            to="/favourites"
            className="favourites-link"
            onClick={closeMenu}
          >
            <span className="favourites-icon">♡</span>
            <span>Favourites</span>
            {totalFavouritesItems > 0 && (
              <span className="favourites-badge">{totalFavouritesItems}</span>
            )}
          </Link>

          <Link to="/cart" className="cart-link" onClick={closeMenu}>
            <span className="cart-icon">🛒</span>
            <span>Cart</span>
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>

          {currentUser ? (
            <>
              <Link
                to="/profile"
                className="nav-profile-link"
                onClick={closeMenu}
              >
                <span className="nav-profile-icon">👤</span>
                <span>Your Profile</span>
              </Link>

              <button
                className="nav-auth-button"
                type="button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={closeMenu}>
                Login
              </Link>

              <Link to="/register" onClick={closeMenu}>
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
