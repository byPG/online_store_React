import { useContext, useState } from "react";
import { FavouritesContext } from "../context/FavouritesContext";
import SingularProductCard from "../components/products/SingularProductCard";

function FavouritesPage() {
  const { favouriteItems } = useContext(FavouritesContext);

  return (
    <main>
      <h1>Favourites Page</h1>
      <p>Your favourite products will be displayed here.</p>
      {favouriteItems.length === 0 && <p>You have no favourite products.</p>}
      {favouriteItems.length > 0 && (
        <div className="product-cards">
          {favouriteItems.map((product) => (
            <SingularProductCard
              className="product-card"
              id={product.id}
              key={product.id}
              name={product.name}
              category={product.category}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default FavouritesPage;
