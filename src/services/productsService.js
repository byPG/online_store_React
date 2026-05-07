import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export async function getProducts() {
  const productsCollection = collection(db, "products");
  const productsSnapshot = await getDocs(productsCollection); //obiekt QuerySnapshot, który zawiera informacje o wynikach zapytania do kolekcji "products"

  const products = productsSnapshot.docs.map((item) => ({
    ...item.data(),
  }));

  return products.sort((a, b) => a.id - b.id);
}

export async function getProductById(productId) {
  const productRef = doc(db, "products", String(productId));
  const productSnapshot = await getDoc(productRef);

  if (!productSnapshot.exists()) {
    return null;
  }

  return productSnapshot.data();
}