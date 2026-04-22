import { useState } from "react";
import dummyProducts from "../data/dummyProducts";
import SingularProductCard from "../components/products/SingularProductCard";

function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? dummyProducts
      : dummyProducts.filter(
          (product) => product.category === selectedCategory,
        );

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
