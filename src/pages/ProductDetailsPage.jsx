import { Link, useParams } from "react-router-dom"; //for reading the dynamic parameter from the URL
// import dummyProducts from "../data/dummyProducts";
import { useState, useContext, useEffect } from "react";
import { getProductById } from "../services/productsService";
import { CartContext } from "../context/CartContext";
import { FavouritesContext } from "../context/FavouritesContext";

function ProductDetailsPage() {
  const { productId } = useParams(); //like in the AppRouter, we defined the dynamic route with :productId

  const [quantity, setQuantity] = useState(1);
  const [openSection, setOpenSection] = useState("description");
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState(null);

  const { addToCart } = useContext(CartContext);
  const { favouriteItems, toggleFavourite } = useContext(FavouritesContext);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProduct() {
      try {
        setIsLoading(true);
        setError("");

        const productFromFirebase = await getProductById(productId);

        if (!productFromFirebase) {
          setError("Product not found.");
          return;
        }

        setSelectedProduct(productFromFirebase);
        setActiveImage(null);
      } catch (firebaseError) {
        setError("Could not load product.");
      } finally {
        setIsLoading(false);
      }
    }

    loadProduct();
  }, [productId]);

  if (isLoading) {
    return (
      <main>
        <p>Loading product...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <h1>{error}</h1>
        <Link className="back-link" to="/products">
          ← Go back to the product list
        </Link>
      </main>
    );
  }

  if (!selectedProduct) {
    return (
      <main>
        <h1>Product not found</h1>
        <Link className="back-link" to="/products">
          ← Go back to the product list
        </Link>
      </main>
    );
  }

  const productImages = selectedProduct.images || [selectedProduct.image];
  const displayedImage = activeImage || productImages[0];

  const isFavourite = favouriteItems.some(
    (item) => item.id === selectedProduct.id,
  );

  function handleDecreaseQuantity() {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  }

  function handleIncreaseQuantity() {
    setQuantity((prevQuantity) => prevQuantity + 1);
  }

  function handleToggleFavourite() {
    toggleFavourite(selectedProduct);
  }

  function handleToggleSection(sectionName) {
    setOpenSection((prevOpenSection) =>
      prevOpenSection === sectionName ? null : sectionName,
    );
  }

  function showAddedToCart() {
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1700);
  }

  function handleAddToCart() {
    addToCart(selectedProduct, quantity);
    showAddedToCart();
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
            src={displayedImage}
            alt={selectedProduct.name}
          />
          {/* mini images below the main image, when you click on them, the main image changes to the one you clicked on */}
          <div className="product-thumbnails">
            {productImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${selectedProduct.name} ${index}`}
                className={`product-thumbnail ${
                  displayedImage === img ? "product-thumbnail-active" : ""
                }`}
                onClick={() => setActiveImage(img)}
              />
            ))}
          </div>
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
              className={`product-details-button ${added ? "product-details-button-added" : ""}`}
              type="button"
              onClick={handleAddToCart}
            >
              {added ? "Added ✓" : "Add to cart"}
            </button>

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
