import dummyProducts from "../data/dummyProducts";
import SingularProductCard from "../components/products/SingularProductCard";

function ProductsPage() {
  return (
    <main>
      <h1>Our Products</h1>
      <p>Discover our collection of skincare, makeup and body care products.</p>

      <section className="products-list">
        {dummyProducts.map((product) => (
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
