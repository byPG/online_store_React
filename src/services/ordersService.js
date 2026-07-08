import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export async function createOrder(orderData) {
  const ordersCollection = collection(db, "orders");

  const orderToSave = {
    ...orderData,
    createdAt: serverTimestamp(),
  };

  const orderRef = await addDoc(ordersCollection, orderToSave);

  return orderRef.id;
}