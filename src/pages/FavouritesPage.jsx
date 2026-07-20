import { Link } from "react-router-dom";
import { useContext } from "react";
import { FavouritesContext } from "../context/FavouritesContext";
import SingularProductCard from "../components/products/SingularProductCard";

function FavouritesPage() {
  const { favouriteItems } = useContext(FavouritesContext);

  return (
    <main>
      <h1>Favourite Products</h1>

      {favouriteItems.length === 0 ? (
        <div className="favourites-empty">
          <p>You have no favourite products yet.</p>
          <Link to="/products" className="favourites-empty-button">
            Browse products
          </Link>
        </div>
      ) : (
        <section className="product-cards-favourites">
          {favouriteItems.map((product) => (
            <div key={product.id}>
              <SingularProductCard
                id={product.id}
                name={product.name}
                category={product.category}
                price={product.price}
                image={product.image}
                className="product-card"
              />
            </div>
          ))}
        </section>
      )}
    </main>
  );
}

export default FavouritesPage;
