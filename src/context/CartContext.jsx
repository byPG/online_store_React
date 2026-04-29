//the logic of sharing the shopping cart state across the entire application

import { createContext, useState, useEffect } from "react"; //for creating the context and using it in the components

export const CartContext = createContext(); //creating the context object, which will hold the cart state and functions to manipulate it

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    //state of the cart & localstorage
    const savedCartItems = localStorage.getItem("cartItems");

    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  function addToCart(product, newQuantity) {
    setCartItems((prevCartItems) => {
      const existingCartItem = prevCartItems.find(
        (item) => item.id === product.id,
      );

      //update the quantity of the product if it is already in the cart
      if (existingCartItem) {
        return prevCartItems.map(
          (item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + newQuantity }
              : item, //product stays in the cart without changes, except for the quantity which is updated
        );
      }
      //if the product is not already in the cart, we add it as a new item
      const newCartItem = {
        ...product,
        quantity: newQuantity,
      };

      return [...prevCartItems, newCartItem];
    });
  }

  function removeFromCart(productId) {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== productId),
    );
  }

  function increaseQuantity(productId) {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  }

  function decreaseQuantity(productId) {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item,
      ),
    );
  }

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  function clearCart() {
    setCartItems([]);
  }

  return (
    <CartContext.Provider // sharing data and functions related to the cart with the entire application
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        totalItems,
        totalPrice,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
