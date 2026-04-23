import { createContext, useState } from "react";

export const FavouritesContext = createContext();

export function FavouritesProvider({ children }) {
  const [favouriteItems, setFavourites] = useState([]);

  function toggleFavourite(product) {
    setFavourites((prevItems) => {
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

  return (
    <FavouritesContext.Provider value={{ favouriteItems, toggleFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
}
