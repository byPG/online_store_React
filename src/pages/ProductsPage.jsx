import { useState, useEffect } from "react";
import { getProducts } from "../services/productsService";
import SingularProductCard from "../components/products/SingularProductCard";

function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All"); // filter state
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const productsFromFirebase = await getProducts();

        console.log("Products from Firebase:", productsFromFirebase);

        setProducts(productsFromFirebase);
      } catch (firebaseError) {
        console.error("Firebase products error:", firebaseError);
        setError("Could not load products.");
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, []);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  if (isLoading) {
    return (
      <main>
        <h1>Our Products</h1>
        <p>Loading products...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <h1>Our Products</h1>
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Our Products</h1>
      <p>Discover our collection of skincare, makeup and body care products.</p>

      <div className="products-filters">
        <button
          type="button"
          className={`filter-button ${selectedCategory === "All" ? "filter-button-active" : ""}`}
          onClick={() => setSelectedCategory("All")}
        >
          All
        </button>
        <button
          type="button"
          className={`filter-button ${selectedCategory === "Skincare" ? "filter-button-active" : ""}`}
          onClick={() => setSelectedCategory("Skincare")}
        >
          Skincare
        </button>
        <button
          type="button"
          className={`filter-button ${selectedCategory === "Makeup" ? "filter-button-active" : ""}`}
          onClick={() => setSelectedCategory("Makeup")}
        >
          Makeup
        </button>
        <button
          type="button"
          className={`filter-button ${selectedCategory === "Body Care" ? "filter-button-active" : ""}`}
          onClick={() => setSelectedCategory("Body Care")}
        >
          Body Care
        </button>
      </div>

      <section className="products-list">
        {filteredProducts.length === 0 && <p>No products found.</p>}

        {filteredProducts.map((product) => (
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
      </section>
    </main>
  );
}

export default ProductsPage;
