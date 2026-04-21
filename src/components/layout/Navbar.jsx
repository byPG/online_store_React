import { Link } from "react-router-dom";
import { useContext } from "react"; //for using the context in the components
import { CartContext } from "../../context/CartContext";

export default function Navbar() {
  const { totalItems } = useContext(CartContext);

  return (
    <header>
      <nav>
        <Link to="/">Beauty Shop</Link>

        <div>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart" className="cart-link">
            <span className="cart-icon">🛒</span>
            <span>Cart</span>
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>
        </div>
      </nav>
    </header>
  );
}
