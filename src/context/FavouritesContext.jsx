import { createContext, useState, useEffect } from "react";

export const FavouritesContext = createContext();

export function FavouritesProvider({ children }) {
  const [favouriteItems, setFavouritesItems] = useState(() => {
    const savedFavouriteItems = localStorage.getItem("favouriteItems");
    return savedFavouriteItems ? JSON.parse(savedFavouriteItems) : [];
  });

  useEffect(() => {
    localStorage.setItem("favouriteItems", JSON.stringify(favouriteItems));
  }, [favouriteItems]);

  function toggleFavourite(product) {
    setFavouritesItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        // If the product is already a favourite, remove it
        return prevItems.filter((item) => item.id !== product.id);
      } else {
        // If the product is not a favourite, add it
        return [...prevItems, product];
      }
    });
  }

  const totalFavouritesItems = favouriteItems.length;

  return (
    <FavouritesContext.Provider
      value={{ favouriteItems, toggleFavourite, totalFavouritesItems }}
    >
      {children}
    </FavouritesContext.Provider>
  );
}
