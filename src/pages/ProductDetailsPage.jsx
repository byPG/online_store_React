import { useParams } from "react-router-dom"; //for reading the dynamic parameter from the URL
import dummyProducts from "../data/dummyProducts";

function ProductDetailsPage() {
  const { productId } = useParams(); //like in the AppRouter, we defined the dynamic route with :productId

  const selectedProduct = dummyProducts.find(
    (product) => product.id === Number(productId),
  );

  if (!selectedProduct) {
    //if there is no product with the given id
    return (
      <main>
        <h1>Product not found</h1>
        <p>We could not find this product.</p>
      </main>
    );
  }

  return (
    <main>
      <h1>{selectedProduct.name}</h1>
      <img
        className="product-details-image"
        src={selectedProduct.image}
        alt={selectedProduct.name}
      />
      <p>{selectedProduct.category}</p>
      <p>{selectedProduct.price} zł</p>
    </main>
  );
}

export default ProductDetailsPage;
