import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../services/productsService";
import SingularProductCard from "../components/products/SingularProductCard";

function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All"); // filter state
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const categories = [
    "All",
    "Skincare",
    "Makeup",
    "Body Care",
    "Soap",
    "Perfume",
    "Accessories",
  ];

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");

    if (categoryFromUrl && categories.includes(categoryFromUrl)) {
      setSelectedCategory(categoryFromUrl);
    } else {
      setSelectedCategory("All");
    }
  }, [searchParams]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const productsFromFirebase = await getProducts();

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

  function handleCategoryChange(category) {
    setSelectedCategory(category);

    if (category === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  }

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
          onClick={() => handleCategoryChange("All")}
        >
          All
        </button>
        <button
          type="button"
          className={`filter-button ${selectedCategory === "Skincare" ? "filter-button-active" : ""}`}
          onClick={() => handleCategoryChange("Skincare")}
        >
          Skincare
        </button>
        <button
          type="button"
          className={`filter-button ${selectedCategory === "Makeup" ? "filter-button-active" : ""}`}
          onClick={() => handleCategoryChange("Makeup")}
        >
          Makeup
        </button>
        <button
          type="button"
          className={`filter-button ${selectedCategory === "Body Care" ? "filter-button-active" : ""}`}
          onClick={() => handleCategoryChange("Body Care")}
        >
          Body Care
        </button>
        <button
          type="button"
          className={`filter-button ${selectedCategory === "Soap" ? "filter-button-active" : ""}`}
          onClick={() => handleCategoryChange("Soap")}
        >
          Soap
        </button>
        <button
          type="button"
          className={`filter-button ${selectedCategory === "Perfume" ? "filter-button-active" : ""}`}
          onClick={() => handleCategoryChange("Perfume")}
        >
          Perfume
        </button>
        <button
          type="button"
          className={`filter-button ${selectedCategory === "Accessories" ? "filter-button-active" : ""}`}
          onClick={() => handleCategoryChange("Accessories")}
        >
          Accessories
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
