import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { FavouritesContext } from "../../context/FavouritesContext";
import { CartContext } from "../../context/CartContext";

function SingularProductCard({ id, name, category, price, image, className }) {
  const { favouriteItems, toggleFavourite } = useContext(FavouritesContext);
  const { addToCart } = useContext(CartContext);

  const [added, setAdded] = useState(false);

  const isFavourite = favouriteItems.some((item) => item.id === id);

  const product = {
    id,
    name,
    category,
    price,
    image,
  };

  function handleToggleFavourite() {
    toggleFavourite(product);
  }

  function handleAddToCart() {
    addToCart(product, 1);

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1200);
  }

  return (
    <article className={className}>
      <Link
        to={`/products/${id}`}
        className="product-link product-card-main-link"
      >
        <img src={image} alt={name} loading="lazy" />

        <h2>{name}</h2>

        <p>{category}</p>

        <p>{price} zł</p>
      </Link>

      <div className="product-card-actions">
        <button
          className={`product-card-cart-button ${
            added ? "product-card-cart-button-added" : ""
          }`}
          type="button"
          onClick={handleAddToCart}
        >
          {added ? "Added ✓" : "Add to cart"}
        </button>

        <button
          className="product-card-favourite-button"
          type="button"
          onClick={handleToggleFavourite}
          aria-label={
            isFavourite ? "Remove from favourites" : "Add to favourites"
          }
        >
          {isFavourite ? "♥" : "♡"}
        </button>
      </div>
    </article>
  );
}

export default SingularProductCard;
