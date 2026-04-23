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

      <section className="product-cards-favourites">
        {favouriteItems.length > 0 && (
          <>
            {favouriteItems.map((product) => (
              <div>
                <SingularProductCard
                  className="product-card"
                  id={product.id}
                  key={product.id}
                  name={product.name}
                  category={product.category}
                  price={product.price}
                  image={product.image}
                />
              </div>
            ))}
          </>
        )}
      </section>
    </main>
  );
}

export default FavouritesPage;
