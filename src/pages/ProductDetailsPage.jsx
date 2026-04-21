import { Link, useParams } from "react-router-dom"; //for reading the dynamic parameter from the URL
import dummyProducts from "../data/dummyProducts";
import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

function ProductDetailsPage() {
  const { productId } = useParams(); //like in the AppRouter, we defined the dynamic route with :productId

  const [quantity, setQuantity] = useState(1);
  const [isFavourite, setIsFavourite] = useState(false);
  const [openSection, setOpenSection] = useState("description");
  const [added, setAdded] = useState(false);

  const { addToCart } = useContext(CartContext);

  const selectedProduct = dummyProducts.find(
    (product) => product.id === Number(productId),
  );

  function handleDecreaseQuantity() {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  }

  function handleIncreaseQuantity() {
    setQuantity((prevQuantity) => prevQuantity + 1);
  }

  function handleToggleFavourite() {
    setIsFavourite((prevIsFavourite) => !prevIsFavourite);
  }

  function handleToggleSection(sectionName) {
    setOpenSection((prevOpenSection) =>
      prevOpenSection === sectionName ? null : sectionName,
    );
  }

  function showAddedToCart() {
    setAdded(true);
  }

  function handleAddToCart() {
    addToCart(selectedProduct, quantity);
    showAddedToCart();
  }

  if (!selectedProduct) {
    //if there is no product with the given id
    return (
      <main>
        <h1>Product not found</h1>
        <p>We could not find this product.</p>
        <Link className="back-link" to="/products">
          ← Go back to the product list
        </Link>
      </main>
    );
  }

  return (
    <main>
      <Link className="back-link" to="/products">
        ← Back to products
      </Link>

      <section className="product-details">
        <div className="product-details-image-box">
          <img
            className="product-details-image"
            src={selectedProduct.image}
            alt={selectedProduct.name}
          />
        </div>

        <div className="product-details-content">
          <p className="product-details-category">{selectedProduct.category}</p>

          <h1>{selectedProduct.name}</h1>

          <p className="product-details-brand">{selectedProduct.brand}</p>

          <p className="product-details-price">{selectedProduct.price} zł</p>

          <p className="product-details-size">Size: {selectedProduct.size}</p>

          <div className="product-details-actions">
            <div className="quantity-box">
              <button type="button" onClick={handleDecreaseQuantity}>
                −
              </button>
              <span>{quantity}</span>
              <button type="button" onClick={handleIncreaseQuantity}>
                +
              </button>
            </div>

            <button
              className="product-details-button"
              type="button"
              onClick={handleAddToCart}
            >
              Add to cart
            </button>

            {added && <p className="added-message">Added to cart ✓</p>}

            <button
              className="favourite-button"
              type="button"
              onClick={handleToggleFavourite}
            >
              {isFavourite ? "♥" : "♡"}
            </button>
          </div>

          <div className="product-details-info">
            <div className="accordion-item">
              <button
                type="button"
                onClick={() => handleToggleSection("description")}
              >
                Description
                <span>{openSection === "description" ? "−" : "+"}</span>
              </button>

              {openSection === "description" && (
                <p>{selectedProduct.description}</p>
              )}
            </div>

            <div className="accordion-item">
              <button
                type="button"
                onClick={() => handleToggleSection("ingredients")}
              >
                Ingredients
                <span>{openSection === "ingredients" ? "−" : "+"}</span>
              </button>

              {openSection === "ingredients" && (
                <p>{selectedProduct.ingredients}</p>
              )}
            </div>

            <div className="accordion-item">
              <button
                type="button"
                onClick={() => handleToggleSection("howToUse")}
              >
                How to use
                <span>{openSection === "howToUse" ? "−" : "+"}</span>
              </button>

              {openSection === "howToUse" && <p>{selectedProduct.howToUse}</p>}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProductDetailsPage;
