import { Link } from "react-router-dom";

function ProductCard({ id, name, category, price, image, className }) {
  return (
    <Link to={`/products/${id}`} className="product-link">
      <article className={className}>
        <img src={image} alt={name} />
        <h2>{name}</h2>
        <p>{category}</p>
        <p>{price} zł</p>
      </article>
    </Link>
  );
}

export default ProductCard;
