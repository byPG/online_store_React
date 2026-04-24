import { Link } from "react-router-dom";
import { useContext } from "react";
import { FavouritesContext } from "../../context/FavouritesContext";

function SingularProductCard({ id, name, category, price, image, className }) {
  const { favouriteItems, toggleFavourite } = useContext(FavouritesContext);

  const isFavourite = favouriteItems.some((item) => item.id === id);

  const product = {
    id,
    name,
    category,
    price,
    image,
  };

  function handleToggleFavourite(event) {
    event.preventDefault();
    toggleFavourite(product);
  }

  return (
    <Link to={`/products/${id}`} className="product-link">
      <article className={className}>
        <img src={image} alt={name} />
        <h2>{name}</h2>
        <p>{category}</p>
        <p>{price} zł</p>
        <button
          className="product-card-favourite-button"
          type="button"
          onClick={handleToggleFavourite}
        >
          {isFavourite ? "♥" : "♡"}
        </button>
      </article>
    </Link>
  );
}

export default SingularProductCard;
