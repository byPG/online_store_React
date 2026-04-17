import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <header>
      <nav>
        <Link to="/">Beauty Shop</Link>

        <div>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart ({totalItems})</Link>
        </div>
      </nav>
    </header>
  );
}
